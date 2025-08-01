import { NextResponse } from 'next/server';
import { getDb } from '../../../lib/db';
import { generateUniqueSlug } from '../../../lib/utils';

// GET - List all coupons
export async function GET() {
  try {
    const db = await getDb();
    const couponsCollection = db.collection('coupons');
    
    const coupons = await couponsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(coupons);
  } catch (error) {
    console.error('Error fetching coupons:', error);
    return NextResponse.json(
      { error: 'Failed to fetch coupons' },
      { status: 500 }
    );
  }
}

// POST - Create a new coupon
export async function POST(request) {
  try {
    const {
      title,
      slug,
      image,
      description,
      couponCode,
      category,
      offerTagline,
      publishDate,
      author
    } = await request.json();

    // Validation
    if (!title || !couponCode || !category) {
      return NextResponse.json(
        { error: 'Title, coupon code, and category are required' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const couponsCollection = db.collection('coupons');

    // Check if coupon code already exists
    const existingCoupon = await couponsCollection.findOne({ couponCode });
    if (existingCoupon) {
      return NextResponse.json(
        { error: 'Coupon code already exists' },
        { status: 400 }
      );
    }

    // Generate unique slug from title (or use provided slug)
    const finalSlug = slug ? await generateUniqueSlug(slug, db) : await generateUniqueSlug(title, db);

    // Create new coupon
    const newCoupon = {
      title,
      slug: finalSlug,
      image: image || '',
      description: description || '',
      couponCode,
      category,
      offerTagline: offerTagline || '',
      publishDate: publishDate ? new Date(publishDate) : new Date(),
      author: author || 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await couponsCollection.insertOne(newCoupon);

    return NextResponse.json(
      { 
        message: 'Coupon created successfully',
        coupon: { ...newCoupon, _id: result.insertedId }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating coupon:', error);
    return NextResponse.json(
      { error: 'Failed to create coupon' },
      { status: 500 }
    );
  }
} 