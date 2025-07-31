import { NextResponse } from 'next/server';
import { testConnection } from '../../../lib/test-connection';

export async function GET() {
  try {
    const result = await testConnection();
    
    if (result.success) {
      return NextResponse.json({
        message: 'Database connection successful',
        collections: result.collections
      });
    } else {
      return NextResponse.json(
        { error: 'Database connection failed', details: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Test connection error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 