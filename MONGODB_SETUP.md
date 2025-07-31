# MongoDB Atlas Setup Guide

## 1. Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project

## 2. Create a Cluster

1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select your preferred cloud provider and region
4. Click "Create"

## 3. Set Up Database Access

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and password (save these!)
5. Set privileges to "Read and write to any database"
6. Click "Add User"

## 4. Set Up Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

## 5. Get Your Connection String

1. Go to "Database" in the left sidebar
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string

## 6. Configure Environment Variables

1. Create a `.env.local` file in your project root
2. Add your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/couponapp?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

**Important:** Replace `your-username`, `your-password`, and `your-cluster` with your actual values.

## 7. Install MongoDB Driver

The MongoDB driver should already be installed. If not, run:

```bash
npm install mongodb
```

## 8. Test the Connection

1. Start your development server: `npm run dev`
2. Try registering a new user
3. Check your MongoDB Atlas dashboard to see if the user was created

## Database Schema

The application will automatically create the following collections:

### Users Collection
```javascript
{
  _id: ObjectId,
  fullName: String,
  email: String,
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

## Security Notes

1. **Never commit your `.env.local` file** - it's already in `.gitignore`
2. **Use strong passwords** for your database user
3. **Restrict network access** in production
4. **Use environment variables** for all sensitive data
5. **Regularly rotate your JWT secret**

## Troubleshooting

### Connection Issues
- Check if your IP is whitelisted in Network Access
- Verify your connection string format
- Ensure your database user has the correct permissions

### Authentication Issues
- Verify your database username and password
- Check if the user exists in the database
- Ensure the JWT secret is properly set

### Development vs Production
- Use different database users for development and production
- Use different JWT secrets for each environment
- Consider using MongoDB Atlas's built-in security features 