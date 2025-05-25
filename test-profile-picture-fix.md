# Profile Picture URL Fix Test Guide

## Issue Description
Profile pictures were appearing correctly in the settings page but disappearing from the header after upload due to incorrect URL handling.

## Root Cause
1. Django was returning relative URLs (`/media/profile_pics/image.jpg`)
2. Next.js frontend (port 3000) was trying to load images from `http://localhost:3000/media/...`
3. But images are served by Django backend (port 8000) at `http://localhost:8000/media/...`

## Solution Applied

### Backend Changes (Django)

1. **Updated ProfilePictureUploadView** (`users/views.py`)
   - Now returns full URLs using `request.build_absolute_uri()`
   - Changed from: `user.profile_picture.url` 
   - Changed to: `request.build_absolute_uri(user.profile_picture.url)`

2. **Updated UserSerializer** (`users/serializers.py`)
   - Added `profile_picture = serializers.SerializerMethodField()`
   - Added `get_profile_picture()` method to return full URLs
   - All API responses now include complete URLs like `http://localhost:8000/media/profile_pics/image.jpg`

3. **Added Request Context** (`users/views.py`)
   - Updated all views using UserSerializer to pass request context
   - Ensures full URLs are generated consistently across all endpoints

### Frontend Configuration
- Next.js image configuration already set up correctly in `next.config.ts`
- Allows images from `localhost:8000` domain

## Test Steps

### Test 1: Upload Profile Picture
1. Go to `/dashboard/settings`
2. Upload a new profile picture
3. Verify image appears correctly in settings page
4. Navigate to other dashboard pages
5. Verify profile picture appears in header navigation
6. Check browser network tab - should see requests to `http://localhost:8000/media/...`

### Test 2: Profile Data API
1. Open browser dev tools
2. Go to Network tab
3. Navigate to `/dashboard/profile` 
4. Check API response for profile data
5. Verify `profile_picture` field contains full URL starting with `http://localhost:8000`

### Expected Results
- ✅ Profile pictures load correctly in all components
- ✅ No more 404 errors for `/media/profile_pics/` in console
- ✅ Images served from Django backend at correct URL
- ✅ Immediate synchronization across all dashboard components

## Verification Commands

### Check Django Media Serving
```bash
curl http://localhost:8000/media/profile_pics/[filename]
# Should return image data, not 404
```

### Check API Response
```bash
curl -H "Authorization: Bearer [token]" http://localhost:8000/api/auth/profile/
# Should show profile_picture with full URL
```

## Files Modified
- `workconnect-api/users/views.py` - ProfilePictureUploadView + all UserSerializer usages
- `workconnect-api/users/serializers.py` - UserSerializer profile_picture field
- `workconnect-web/next.config.ts` - (already configured)

## Future Improvements
1. **Image Optimization**: Consider adding image resizing/compression
2. **CDN Integration**: Move to cloud storage (AWS S3, Cloudinary) for production
3. **Caching**: Add client-side caching for profile images
4. **Progressive Loading**: Add loading states while images load 