"use client";

import React, { useState } from 'react';
import { Mail, AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { useAuth } from '@/lib/auth-context';

interface VerificationModalProps {
  userEmail: string;
  onClose?: () => void;
}

export default function VerificationModal({ userEmail, onClose }: VerificationModalProps) {
  const [resending, setResending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');
  const { logout } = useAuth();

  const handleResendEmail = async () => {
    setError('');
    setResending(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/resend-verification/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmailSent(true);
      } else {
        setError(data.error || 'Failed to send verification email');
      }
    } catch (_error) {
      setError('Network error. Please try again.');
    } finally {
      setResending(false);
    }
  };

  const handleLogout = () => {
    logout();
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        {/* Warning Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-amber-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center text-zinc-900 mb-2">
          Email Verification Required
        </h2>

        {/* Description */}
        <p className="text-sm text-zinc-600 text-center mb-6">
          Please verify your email address to access your account. We&apos;ve sent a verification link to{' '}
          <span className="font-medium text-zinc-900">{userEmail}</span>
        </p>

        {/* Error Alert */}
        {error && (
          <Alert className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
            {error}
          </Alert>
        )}

        {/* Success Alert */}
        {emailSent && (
          <Alert className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            Verification email sent successfully! Check your inbox.
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleResendEmail}
            disabled={resending || emailSent}
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3 rounded-md flex items-center justify-center"
          >
            {resending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : emailSent ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Email Sent!
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Resend Verification Email
              </>
            )}
          </Button>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-zinc-300 text-zinc-700 py-3 rounded-md"
          >
            Logout
          </Button>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-xs text-zinc-500">
            Didn&apos;t receive the email? Check your spam folder or try resending.
          </p>
        </div>
      </div>
    </div>
  );
} 