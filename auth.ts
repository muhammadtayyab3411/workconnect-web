import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          // Send the Google user data to your Django backend
          // Note: We'll handle role assignment later in the setup completion page
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/auth/google-login/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id_token: account.id_token,
              role: 'client', // Default role, will be updated later if needed
            }),
          });

          if (response.ok) {
            const data = await response.json();
            
            // Store Django tokens in the user object for later use
            user.accessToken = data.tokens?.access || data.access;
            user.refreshToken = data.tokens?.refresh || data.refresh;
            user.djangoUser = data.user;
            
            return true;
          } else {
            console.error('Django authentication failed:', await response.text());
            return false;
          }
        } catch (error) {
          console.error('Error during Django authentication:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      // Persist Django tokens in the JWT
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.djangoUser = user.djangoUser;
      }
      return token;
    },
    async session({ session, token }) {
      // Send Django tokens to the client
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.djangoUser = token.djangoUser;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
  events: {
    async signIn({ user, account }) {
      // Store Django tokens in cookies after successful sign-in
      if (account?.provider === 'google' && user.accessToken) {
        // Note: We can't set cookies directly here, we'll handle this in the middleware
        console.log('User signed in with Django tokens');
      }
    }
  }
}); 