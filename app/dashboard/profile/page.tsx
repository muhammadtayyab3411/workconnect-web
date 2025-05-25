"use client";

import Image from "next/image";
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Star,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  Lock,
  Upload,
  Loader2,
  FileText,
  Eye,
  Trash2
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect, useRef } from "react";
import { LogoutDialog } from "@/components/common/LogoutDialog";
import { useAuth } from "@/lib/auth-context";
import { userAPI, UserProfile, Document, DocumentUpload } from "@/lib/api";

export default function ProfilePage() {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [documentsLoading, setDocumentsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadingDocument, setUploadingDocument] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedDocumentType, setSelectedDocumentType] = useState<'national_id' | 'address_proof' | 'license' | null>(null);
  const { user } = useAuth();

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await userAPI.getProfile();
        setProfileData(data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError('Failed to load profile data');
        // Fallback to auth context user if API fails
        if (user) {
          setProfileData(user as UserProfile);
        }
      } finally {
        setLoading(false);
      }
    };

    // Use auth context user data first, then fetch fresh data
    if (user) {
      setProfileData(user as UserProfile);
      setLoading(false);
      // Optionally fetch fresh data in background
      fetchProfile();
    }
  }, [user]); // Watch for user changes from auth context

  // Fetch documents
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setDocumentsLoading(true);
        const docs = await userAPI.getDocuments();
        setDocuments(docs);
      } catch (err) {
        console.error('Failed to fetch documents:', err);
        // Don't show error for documents, just keep empty array
      } finally {
        setDocumentsLoading(false);
      }
    };

    if (user) {
      fetchDocuments();
    }
  }, [user]);

  // Calculate profile completion percentage
  const calculateProfileCompletion = (profile: UserProfile) => {
    const fields = [
      profile.first_name,
      profile.last_name,
      profile.email,
      profile.phone_number,
      profile.address,
      profile.profile_picture,
    ];
    const completedFields = fields.filter(field => field && field.trim() !== '').length;
    return Math.round((completedFields / fields.length) * 100);
  };

  // Get status badge for document
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded flex items-center">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </span>
        );
      case 'pending':
        return (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case 'manual_review':
        return (
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded flex items-center">
            <Eye className="w-3 h-3 mr-1" />
            Review
          </span>
        );
      case 'rejected':
        return (
          <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded flex items-center">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  // Get document by type
  const getDocumentByType = (type: 'national_id' | 'address_proof' | 'license') => {
    return documents.find(doc => doc.document_type === type);
  };

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedDocumentType) return;

    try {
      setUploadingDocument(selectedDocumentType);
      
      const uploadData: DocumentUpload = {
        document_type: selectedDocumentType,
        document_file: file
      };
      
      await userAPI.uploadDocument(uploadData);
      
      // Refresh documents list
      const updatedDocs = await userAPI.getDocuments();
      setDocuments(updatedDocs);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setSelectedDocumentType(null);
    } catch (err) {
      console.error('Failed to upload document:', err);
      alert('Failed to upload document. Please try again.');
    } finally {
      setUploadingDocument(null);
    }
  };

  // Handle document deletion
  const handleDeleteDocument = async (documentId: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    
    try {
      await userAPI.deleteDocument(documentId);
      // Refresh documents list
      const updatedDocs = await userAPI.getDocuments();
      setDocuments(updatedDocs);
    } catch (err) {
      console.error('Failed to delete document:', err);
      alert('Failed to delete document. Please try again.');
    }
  };

  // Handle re-verification
  const handleReverifyDocument = async (documentId: string) => {
    try {
      setUploadingDocument('reverify');
      await userAPI.reverifyDocument(documentId);
      // Refresh documents list
      const updatedDocs = await userAPI.getDocuments();
      setDocuments(updatedDocs);
    } catch (err) {
      console.error('Failed to re-verify document:', err);
      alert('Failed to re-verify document. Please try again.');
    } finally {
      setUploadingDocument(null);
    }
  };

  // Trigger file input for specific document type
  const triggerFileUpload = (documentType: 'national_id' | 'address_proof' | 'license') => {
    setSelectedDocumentType(documentType);
    fileInputRef.current?.click();
  };

  if (loading) {
    return (
      <div className="py-6 flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin text-zinc-600" />
          <span className="text-zinc-600">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (error && !profileData) {
    return (
      <div className="py-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-red-500 mb-2">
            <XCircle className="w-12 h-12 mx-auto" />
          </div>
          <h2 className="text-lg font-semibold text-zinc-900 mb-2">Failed to Load Profile</h2>
          <p className="text-zinc-600 mb-4">{error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            variant="outline"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const profile = profileData || user;
  if (!profile) return null;

  const profileCompletion = calculateProfileCompletion(profile as UserProfile);
  const profilePictureUrl = profile.profile_picture || "/images/user2.jpg";
  
  return (
    <div className="py-6">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*,.pdf"
        className="hidden"
      />

      {/* Profile Header Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Profile Image */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-zinc-100 overflow-hidden">
              <Image 
                src={profilePictureUrl}
                alt={`${profile.first_name} ${profile.last_name}`}
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>
            
            <Button 
              variant="outline" 
              className="mt-3 w-full bg-zinc-100 text-zinc-800 hover:bg-zinc-200 border-0"
              onClick={() => {
                window.location.href = '/dashboard/settings';
              }}
            >
              Edit Photo
            </Button>
          </div>
          
          {/* Profile Info */}
          <div className="flex-1 md:mt-0 mt-4">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-zinc-900">
                  {profile.first_name} {profile.last_name}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-zinc-600 capitalize">
                    Professional {profile.role === 'worker' ? 'Worker' : 'Client'}
                  </span>
                  {profile.is_verified && (
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </span>
                  )}
                </div>
                
                {profile.address && (
                  <div className="mt-2 flex items-center text-zinc-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{profile.address}</span>
                  </div>
                )}
              </div>
              
              <Button 
                className="bg-zinc-900 hover:bg-zinc-800 text-white"
                onClick={() => {
                  window.location.href = '/dashboard/settings';
                }}
              >
                Edit Profile
              </Button>
            </div>
            
            {/* Profile Completion Progress */}
            <div className="mt-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Profile Completion</span>
                <span className="text-sm font-medium">{profileCompletion}%</span>
              </div>
              <div className="w-full bg-zinc-200 rounded-full h-2">
                <div 
                  className="bg-zinc-900 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${profileCompletion}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personal Information */}
        <Card className="border border-zinc-200 shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-zinc-700 mt-0.5 mr-3" />
                <span className="text-zinc-600">{profile.email}</span>
              </div>
              
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-zinc-700 mt-0.5 mr-3" />
                <span className="text-zinc-600">{profile.phone_number || 'Phone number not set'}</span>
              </div>
              
              <div className="flex items-start">
                <Globe className="w-5 h-5 text-zinc-700 mt-0.5 mr-3" />
                <span className="text-zinc-600">
                  Languages: {profileData?.languages && profileData.languages.length > 0 
                    ? profileData.languages.join(', ') 
                    : 'Not specified'}
                </span>
              </div>
            </div>
            
            {/* Bio Section */}
            {profileData?.bio && (
              <>
                <div className="border-t border-zinc-200 my-4"></div>
                <h3 className="text-lg font-medium mb-3">About</h3>
                <p className="text-zinc-600 mb-4">{profileData.bio}</p>
              </>
            )}
            
            <div className="border-t border-zinc-200 my-4"></div>
            
            {/* Skills & Specialties */}
            <h3 className="text-lg font-medium mb-3">Skills & Specialties</h3>
            {profileData?.skills && profileData.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-4">
                {profileData.skills.map((skill, index) => (
                  <span key={index} className="bg-zinc-100 text-zinc-800 text-sm px-3 py-1 rounded-full font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-zinc-500 text-sm mb-4">No skills added yet</p>
            )}
            
            <div className="border-t border-zinc-200 my-4"></div>
            
            {/* Experience */}
            <h3 className="text-lg font-medium mb-3">Experience</h3>
            <p className="text-zinc-600 mb-4">
              {profileData?.experience_display || 'Experience not specified'}
            </p>
            
            <div className="border-t border-zinc-200 my-4"></div>
            
            {/* Rating */}
            <h3 className="text-lg font-medium mb-3">Rating</h3>
            {profileData && profileData.total_reviews > 0 ? (
              <div className="flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-4 h-4 ${
                        star <= Math.floor(profileData.average_rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-zinc-600 ml-2">
                  ({profileData.average_rating} / 5.0) • {profileData.total_reviews} reviews
                </span>
              </div>
            ) : (
              <p className="text-zinc-500 text-sm">No reviews yet</p>
            )}
          </div>
        </Card>
        
        {/* Document Verification */}
        <Card className="border border-zinc-200 shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Document Verification</h2>
            
            {documentsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-zinc-600" />
                <span className="ml-2 text-zinc-600">Loading documents...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {/* National ID */}
                {(() => {
                  const nationalIdDoc = getDocumentByType('national_id');
                  return (
                    <div className="border border-zinc-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">National ID</h3>
                        {nationalIdDoc ? (
                          getStatusBadge(nationalIdDoc.status)
                        ) : (
                          <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded flex items-center">
                            <FileText className="w-3 h-3 mr-1" />
                            Not Uploaded
                          </span>
                        )}
                      </div>
                      {nationalIdDoc ? (
                        <div>
                          <p className="text-sm text-zinc-500 mb-2">
                            Uploaded on {new Date(nationalIdDoc.uploaded_at).toLocaleDateString()}
                          </p>
                          {nationalIdDoc.verification_notes && (
                            <p className="text-xs text-zinc-500 mb-2">{nationalIdDoc.verification_notes}</p>
                          )}
                          <div className="flex gap-2">
                            {nationalIdDoc.document_url && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open(nationalIdDoc.document_url!, '_blank')}
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </Button>
                            )}
                            {nationalIdDoc.status === 'rejected' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleReverifyDocument(nationalIdDoc.id)}
                                disabled={uploadingDocument === 'reverify'}
                              >
                                {uploadingDocument === 'reverify' ? (
                                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                ) : (
                                  <Upload className="w-3 h-3 mr-1" />
                                )}
                                Re-verify
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteDocument(nationalIdDoc.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-zinc-500 mb-2">Upload your government-issued ID</p>
                          <Button
                            size="sm"
                            onClick={() => triggerFileUpload('national_id')}
                            disabled={uploadingDocument === 'national_id'}
                            className="bg-zinc-900 hover:bg-zinc-800 text-white"
                          >
                            {uploadingDocument === 'national_id' ? (
                              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                            ) : (
                              <Upload className="w-3 h-3 mr-1" />
                            )}
                            Upload
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })()}
                
                {/* Professional License */}
                {(() => {
                  const licenseDoc = getDocumentByType('license');
                  return (
                    <div className="border border-zinc-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">Professional License</h3>
                        {licenseDoc ? (
                          getStatusBadge(licenseDoc.status)
                        ) : (
                          <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded flex items-center">
                            <FileText className="w-3 h-3 mr-1" />
                            Not Uploaded
                          </span>
                        )}
                      </div>
                      {licenseDoc ? (
                        <div>
                          <p className="text-sm text-zinc-500 mb-2">
                            Uploaded on {new Date(licenseDoc.uploaded_at).toLocaleDateString()}
                          </p>
                          {licenseDoc.verification_notes && (
                            <p className="text-xs text-zinc-500 mb-2">{licenseDoc.verification_notes}</p>
                          )}
                          <div className="flex gap-2">
                            {licenseDoc.document_url && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open(licenseDoc.document_url!, '_blank')}
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </Button>
                            )}
                            {licenseDoc.status === 'rejected' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleReverifyDocument(licenseDoc.id)}
                                disabled={uploadingDocument === 'reverify'}
                              >
                                {uploadingDocument === 'reverify' ? (
                                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                ) : (
                                  <Upload className="w-3 h-3 mr-1" />
                                )}
                                Re-verify
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteDocument(licenseDoc.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-zinc-500 mb-2">Upload your professional license</p>
                          <Button
                            size="sm"
                            onClick={() => triggerFileUpload('license')}
                            disabled={uploadingDocument === 'license'}
                            className="bg-zinc-900 hover:bg-zinc-800 text-white"
                          >
                            {uploadingDocument === 'license' ? (
                              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                            ) : (
                              <Upload className="w-3 h-3 mr-1" />
                            )}
                            Upload
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })()}
                
                {/* Address Proof */}
                {(() => {
                  const addressDoc = getDocumentByType('address_proof');
                  return (
                    <div className="border border-zinc-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">Address Proof</h3>
                        {addressDoc ? (
                          getStatusBadge(addressDoc.status)
                        ) : (
                          <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded flex items-center">
                            <FileText className="w-3 h-3 mr-1" />
                            Not Uploaded
                          </span>
                        )}
                      </div>
                      {addressDoc ? (
                        <div>
                          <p className="text-sm text-zinc-500 mb-2">
                            Uploaded on {new Date(addressDoc.uploaded_at).toLocaleDateString()}
                          </p>
                          {addressDoc.verification_notes && (
                            <p className="text-xs text-zinc-500 mb-2">{addressDoc.verification_notes}</p>
                          )}
                          <div className="flex gap-2">
                            {addressDoc.document_url && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open(addressDoc.document_url!, '_blank')}
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </Button>
                            )}
                            {addressDoc.status === 'rejected' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleReverifyDocument(addressDoc.id)}
                                disabled={uploadingDocument === 'reverify'}
                              >
                                {uploadingDocument === 'reverify' ? (
                                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                ) : (
                                  <Upload className="w-3 h-3 mr-1" />
                                )}
                                Re-verify
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteDocument(addressDoc.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-zinc-500 mb-2">Upload a recent utility bill or bank statement</p>
                          <Button
                            size="sm"
                            onClick={() => triggerFileUpload('address_proof')}
                            disabled={uploadingDocument === 'address_proof'}
                            className="bg-zinc-900 hover:bg-zinc-800 text-white"
                          >
                            {uploadingDocument === 'address_proof' ? (
                              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                            ) : (
                              <Upload className="w-3 h-3 mr-1" />
                            )}
                            Upload
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}
            
            {!documentsLoading && (
              <div className="mt-6 p-4 bg-zinc-50 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Upload Requirements:</h4>
                <ul className="text-xs text-zinc-600 space-y-1">
                  <li>• Max file size: 5MB</li>
                  <li>• Formats: JPG, PNG, GIF, PDF</li>
                  <li>• Clear, readable documents</li>
                  <li>• Automatic AI verification</li>
                </ul>
              </div>
            )}
          </div>
        </Card>
        
        {/* Profile Settings */}
        <Card className="border border-zinc-200 shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">Profile Visibility</h3>
                  <Switch defaultChecked />
                </div>
                <p className="text-sm text-zinc-500">
                  Make your profile visible to potential {profile.role === 'worker' ? 'clients' : 'workers'}
                </p>
              </div>
              
              <div className="border-t border-zinc-200 my-4"></div>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Profile PDF
              </Button>
              
              <Button variant="outline" className="w-full flex items-center justify-center">
                <Lock className="w-4 h-4 mr-2" />
                Change Password
              </Button>
              
              <div className="border-t border-zinc-200 my-4"></div>
              
              <div className="bg-zinc-100 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Account Status</h3>
                <p className="text-sm text-zinc-600">
                  Your account is fully verified and active. You can now receive job requests.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <LogoutDialog 
        open={showLogoutDialog} 
        onOpenChange={setShowLogoutDialog} 
      />
    </div>
  );
} 