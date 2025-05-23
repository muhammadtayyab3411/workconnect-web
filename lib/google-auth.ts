declare global {
  interface Window {
    google: any;
  }
}

export interface GoogleCredentialResponse {
  credential: string;
  select_by: string;
}

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
}

// Initialize Google OAuth
export const initializeGoogleAuth = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if Google script is already loaded
    if (window.google) {
      resolve();
      return;
    }

    // Load Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      // Wait a bit for Google to initialize
      setTimeout(() => {
        if (window.google) {
          resolve();
        } else {
          reject(new Error('Google failed to initialize'));
        }
      }, 100);
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load Google script'));
    };
    
    document.head.appendChild(script);
  });
};

// Decode JWT token (Google ID token)
const decodeJWT = (token: string): GoogleUser => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

// Google Sign In with One Tap
export const signInWithGoogle = (onSuccess: (user: GoogleUser, idToken: string) => void, onError: (error: string) => void) => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  
  if (!clientId) {
    onError('Google Client ID not configured');
    return;
  }

  initializeGoogleAuth()
    .then(() => {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response: GoogleCredentialResponse) => {
          try {
            const user = decodeJWT(response.credential);
            onSuccess(user, response.credential);
          } catch (error) {
            onError('Failed to decode Google response');
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      // Render the sign-in button or show One Tap
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed()) {
          // Fallback to button if One Tap is not displayed
          console.log('One Tap not displayed, could show button instead');
        }
      });
    })
    .catch((error) => {
      onError(error.message);
    });
};

// Google Sign In with Popup
export const signInWithGooglePopup = (onSuccess: (user: GoogleUser, idToken: string) => void, onError: (error: string) => void) => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  
  if (!clientId) {
    onError('Google Client ID not configured');
    return;
  }

  initializeGoogleAuth()
    .then(() => {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response: GoogleCredentialResponse) => {
          try {
            const user = decodeJWT(response.credential);
            onSuccess(user, response.credential);
          } catch (error) {
            onError('Failed to decode Google response');
          }
        },
      });

      // Show the sign-in popup
      window.google.accounts.id.prompt();
    })
    .catch((error) => {
      onError(error.message);
    });
};

// Alternative method using OAuth2 popup
export const signInWithGoogleOAuth = (onSuccess: (accessToken: string, idToken?: string) => void, onError: (error: string) => void) => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirectUri = typeof window !== 'undefined' ? `${window.location.origin}` : '';
  
  if (!clientId) {
    onError('Google Client ID not configured');
    return;
  }

  // Create OAuth URL
  const scope = 'openid profile email';
  const responseType = 'code';
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${encodeURIComponent(clientId)}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=${encodeURIComponent(scope)}&` +
    `response_type=${encodeURIComponent(responseType)}&` +
    `access_type=offline`;

  // Open popup window
  const popup = window.open(
    authUrl,
    'google-signin',
    'width=500,height=600,scrollbars=yes,resizable=yes'
  );

  if (!popup) {
    onError('Failed to open popup');
    return;
  }

  // Monitor popup for completion
  const checkClosed = setInterval(() => {
    if (popup.closed) {
      clearInterval(checkClosed);
      onError('Sign-in cancelled');
    }
  }, 1000);

  // Listen for message from popup
  const messageListener = (event: MessageEvent) => {
    if (event.origin !== window.location.origin) return;
    
    if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
      clearInterval(checkClosed);
      window.removeEventListener('message', messageListener);
      popup.close();
      onSuccess(event.data.access_token, event.data.id_token);
    } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
      clearInterval(checkClosed);
      window.removeEventListener('message', messageListener);
      popup.close();
      onError(event.data.error);
    }
  };

  window.addEventListener('message', messageListener);
}; 