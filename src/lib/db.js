import clientPromise from './mongodb';

export async function getDb() {
  const client = await clientPromise;
  return client.db('couponapp');
}

export async function getUsersCollection() {
  const db = await getDb();
  return db.collection('users');
}

export async function findUserByEmail(email) {
  const usersCollection = await getUsersCollection();
  return await usersCollection.findOne({ email });
}

export async function findUserById(id) {
  const usersCollection = await getUsersCollection();
  const { ObjectId } = await import('mongodb');
  return await usersCollection.findOne({ _id: new ObjectId(id) });
}

export async function createUser(userData) {
  const usersCollection = await getUsersCollection();
  const result = await usersCollection.insertOne({
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return result;
}

export async function updateUser(id, updateData) {
  const usersCollection = await getUsersCollection();
  const { ObjectId } = await import('mongodb');
  return await usersCollection.updateOne(
    { _id: new ObjectId(id) },
    { 
      $set: {
        ...updateData,
        updatedAt: new Date()
      }
    }
  );
}

export async function deleteUser(id) {
  const usersCollection = await getUsersCollection();
  const { ObjectId } = await import('mongodb');
  return await usersCollection.deleteOne({ _id: new ObjectId(id) });
} 