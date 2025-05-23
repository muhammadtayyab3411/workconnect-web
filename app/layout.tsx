import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProviderClient } from "@/lib/auth-provider";
import { SessionProvider } from "next-auth/react";
import VerificationGuard from "@/components/VerificationGuard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WorkConnect - Connect with Local Professionals",
  description: "Find and hire local service providers for all your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SessionProvider>
          <AuthProviderClient>
            <VerificationGuard>
              {children}
            </VerificationGuard>
          </AuthProviderClient>
        </SessionProvider>
      </body>
    </html>
  );
}
