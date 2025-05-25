# Profile Validation Test Guide

## Overview
This document outlines the comprehensive profile validation system that syncs frontend and backend validation for better UX.

## Validation Rules

### Required Fields (Backend enforced, Frontend validated)
- **First Name**: Required, minimum 2 characters
- **Last Name**: Required, minimum 2 characters

### Optional Fields (Validated when provided)
- **Phone Number**: Optional, but if provided:
  - Must be at least 10 digits
  - Can include country codes (+)
  - Allows common formats: spaces, dashes, parentheses
- **Address**: Optional, helps with location-based matching
- **Date of Birth**: Optional, but if provided:
  - Cannot be in the future
  - Must be at least 16 years old
  - Must be reasonable (not over 120 years old)

## UX Features

### Real-time Validation
- Validation occurs 500ms after user stops typing
- Errors clear immediately when user starts correcting them
- Visual feedback with red borders and error messages

### Partial Updates
- Only fields with actual values are sent to backend
- No required field errors for unchanged fields
- Smart validation that respects optional nature of fields

### Error Handling
- Frontend validation prevents unnecessary API calls
- Backend validation errors are mapped to specific fields
- Clear error messages explain what needs to be fixed

### Visual Indicators
- Required fields marked with *
- Error summary box when validation fails
- Helpful text explaining purpose of optional fields
- Role-based contextual help text

## Test Cases

### 1. Required Field Validation
- Clear first name → Should show "First name is required"
- Enter single character → Should show "First name must be at least 2 characters"
- Same validation applies to last name

### 2. Phone Number Validation
- Enter "123" → Should show "Phone number must be at least 10 digits"
- Enter "abc123" → Should show "Please enter a valid phone number"
- Enter "+1 (555) 123-4567" → Should be valid
- Leave empty → Should be valid (optional field)

### 3. Date of Birth Validation
- Enter future date → Should show "Date of birth cannot be in the future"
- Enter date making user 15 → Should show "You must be at least 16 years old"
- Enter very old date → Should show "Please enter a valid date of birth"
- Leave empty → Should be valid (optional field)

### 4. Partial Update Scenarios
- Update only last name → Should work without requiring other fields
- Update phone with valid number → Should work
- Update multiple fields → Should validate all and update

## Backend Sync
- Frontend validation mirrors backend validation rules
- Field requirements match database constraints
- Error messages are consistent between frontend and backend
- Partial updates properly handled without false required field errors

## Benefits
1. **Better UX**: Users see validation errors immediately
2. **Reduced API Calls**: Invalid data caught before submission
3. **Clear Expectations**: Users know what's required vs optional
4. **Consistent Experience**: Frontend and backend validation aligned
5. **Smart Updates**: Only changed fields are updated 