// Utility function to generate URL-friendly slugs
export function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Function to ensure unique slug by appending number if needed
export async function generateUniqueSlug(title, db, existingId = null) {
  let baseSlug = generateSlug(title);
  let slug = baseSlug;
  let counter = 1;
  
  const couponsCollection = db.collection('coupons');
  
  // Keep trying until we find a unique slug
  while (true) {
    const query = { slug };
    if (existingId) {
      query._id = { $ne: existingId };
    }
    
    const existing = await couponsCollection.findOne(query);
    if (!existing) {
      break;
    }
    
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
} 