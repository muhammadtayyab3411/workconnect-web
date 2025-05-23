import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    djangoUser?: {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
      role: string;
      phone_number: string;
      is_verified: boolean;
    };
  }

  interface User {
    accessToken?: string;
    refreshToken?: string;
    djangoUser?: {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
      role: string;
      phone_number: string;
      is_verified: boolean;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    djangoUser?: {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
      role: string;
      phone_number: string;
      is_verified: boolean;
    };
  }
} 