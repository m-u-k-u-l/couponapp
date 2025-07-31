# Image Upload Functionality Guide

## Overview

The image upload functionality has been implemented end-to-end for the CreateCoupon and EditCoupon components. This replaces the previous "Image URL" field with a proper file upload system.

## Features

### Frontend Components

1. **ImageUpload Component** (`src/app/components/ImageUpload.js`)
   - Drag and drop functionality
   - File type validation (JPEG, PNG, WebP)
   - File size validation (5MB limit)
   - Image preview
   - Upload progress indicator
   - Error handling
   - Remove image functionality

### Backend API

2. **Upload API** (`src/app/api/upload/route.js`)
   - Handles multipart form data
   - File validation (type and size)
   - Secure file naming with timestamps
   - Stores files in `public/uploads/` directory
   - Returns public URL for uploaded images

## How It Works

### 1. File Selection
- Users can click to browse files or drag and drop images
- Only image files (JPEG, PNG, WebP) are accepted
- Maximum file size is 5MB

### 2. File Upload
- Selected files are immediately uploaded to the server
- Files are stored with unique names to prevent conflicts
- Upload progress is shown to the user

### 3. Image Preview
- After successful upload, the image is displayed as a preview
- Users can remove the image and upload a new one
- The image URL is automatically stored in the form data

### 4. Database Storage
- The image URL (e.g., `/uploads/1234567890-abc123.jpg`) is stored in the database
- Images are served statically from the `public/uploads/` directory

## File Structure

```
public/
  uploads/          # Uploaded images are stored here
    .gitkeep        # Keeps the directory in git (empty file)
```

## Security Features

1. **File Type Validation**: Only image files are allowed
2. **File Size Limits**: Maximum 5MB per file
3. **Unique File Names**: Prevents file conflicts
4. **Secure Storage**: Files are stored in a controlled directory

## Usage

### In CreateCoupon Component
```jsx
import ImageUpload from '../../../components/ImageUpload';

// In your form
<ImageUpload
  onImageUpload={handleImageUpload}
  currentImage={formData.image}
  className="w-full"
/>
```

### In EditCoupon Component
```jsx
import ImageUpload from '../../../../components/ImageUpload';

// In your form
<ImageUpload
  onImageUpload={handleImageUpload}
  currentImage={formData.image}
  className="w-full"
/>
```

## API Endpoints

### POST /api/upload
- **Purpose**: Upload image files
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Parameters**: 
  - `image`: File object
- **Response**: 
  ```json
  {
    "message": "Image uploaded successfully",
    "imageUrl": "/uploads/1234567890-abc123.jpg",
    "fileName": "1234567890-abc123.jpg"
  }
  ```

## Error Handling

The system handles various error scenarios:
- Invalid file types
- File size too large
- Network errors
- Server errors

Error messages are displayed to the user in a user-friendly format.

## Configuration

### File Size Limit
The maximum file size is set to 5MB. To change this, modify the `maxSize` variable in `src/app/api/upload/route.js`:

```javascript
const maxSize = 5 * 1024 * 1024; // 5MB
```

### Allowed File Types
To modify allowed file types, update the `allowedTypes` array in both the frontend component and backend API:

```javascript
const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
```

## Notes

- Uploaded files are stored in the `public/uploads/` directory
- The directory is added to `.gitignore` to prevent committing uploaded files
- Images are served statically by Next.js
- File names include timestamps to prevent conflicts 