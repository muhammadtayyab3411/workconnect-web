"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Here you would normally handle logout actions like clearing tokens, etc.
    // For now, we'll just redirect to the login page
    const timeout = setTimeout(() => {
      router.push("/auth/login");
    }, 500);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">Logging out...</h1>
        <p className="text-zinc-600">Redirecting you to the login page.</p>
      </div>
    </div>
  );
} 