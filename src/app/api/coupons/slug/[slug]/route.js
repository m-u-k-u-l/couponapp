// ⚠️ This MUST be the very first line in the file
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { getDb } from '../../../../../lib/db';

export async function GET(request, context) {
  try {
    // ✅ This will work reliably even if runtime is still edge
    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const couponsCollection = db.collection('coupons');

    const coupon = await couponsCollection.findOne({ slug });

    if (!coupon) {
      return NextResponse.json(
        { error: 'Coupon not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(coupon);
  } catch (error) {
    console.error('Error fetching coupon by slug:', error);
    return NextResponse.json(
      { error: 'Failed to fetch coupon' },
      { status: 500 }
    );
  }
}
