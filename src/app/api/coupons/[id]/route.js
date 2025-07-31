import { NextResponse } from 'next/server';
import { getDb } from '../../../../lib/db';
import { ObjectId } from 'mongodb';

// GET - Get a specific coupon
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid coupon ID' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const couponsCollection = db.collection('coupons');
    
    const coupon = await couponsCollection.findOne({ _id: new ObjectId(id) });
    
    if (!coupon) {
      return NextResponse.json(
        { error: 'Coupon not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(coupon);
  } catch (error) {
    console.error('Error fetching coupon:', error);
    return NextResponse.json(
      { error: 'Failed to fetch coupon' },
      { status: 500 }
    );
  }
}

// PUT - Update a coupon
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const {
      title,
      image,
      description,
      couponCode,
      category,
      offerTagline,
      publishDate,
      author
    } = await request.json();

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid coupon ID' },
        { status: 400 }
      );
    }

    // Validation
    if (!title || !couponCode || !category) {
      return NextResponse.json(
        { error: 'Title, coupon code, and category are required' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const couponsCollection = db.collection('coupons');

    // Check if coupon code already exists (excluding current coupon)
    const existingCoupon = await couponsCollection.findOne({
      couponCode,
      _id: { $ne: new ObjectId(id) }
    });
    
    if (existingCoupon) {
      return NextResponse.json(
        { error: 'Coupon code already exists' },
        { status: 400 }
      );
    }

    // Update coupon
    const updateData = {
      title,
      image: image || '',
      description: description || '',
      couponCode,
      category,
      offerTagline: offerTagline || '',
      publishDate: publishDate ? new Date(publishDate) : new Date(),
      author: author || 'Admin',
      updatedAt: new Date()
    };

    const result = await couponsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Coupon not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Coupon updated successfully',
      coupon: { ...updateData, _id: id }
    });

  } catch (error) {
    console.error('Error updating coupon:', error);
    return NextResponse.json(
      { error: 'Failed to update coupon' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a coupon
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid coupon ID' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const couponsCollection = db.collection('coupons');
    
    const result = await couponsCollection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Coupon not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Coupon deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting coupon:', error);
    return NextResponse.json(
      { error: 'Failed to delete coupon' },
      { status: 500 }
    );
  }
} 