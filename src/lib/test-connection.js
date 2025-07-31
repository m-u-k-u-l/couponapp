import clientPromise from './mongodb';

export async function testConnection() {
  try {
    const client = await clientPromise;
    const db = client.db('couponapp');
    
    // Test the connection by listing collections
    const collections = await db.listCollections().toArray();
    console.log('✅ MongoDB connection successful!');
    console.log('Available collections:', collections.map(c => c.name));
    
    return { success: true, collections: collections.map(c => c.name) };
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    return { success: false, error: error.message };
  }
} 