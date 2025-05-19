import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reviews Given | WorkConnect",
  description: "Manage and view your reviews given to workers on WorkConnect",
};

// This is a mock of authentication logic that would normally come from an authenticated session
const getCurrentUser = () => {
  return {
    name: "Alex Thompson",
    role: "client",
    image: "/images/user2.jpg",
  };
};

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = getCurrentUser();

  // If user is not a client, redirect to dashboard
  if (user.role !== "client") {
    redirect("/dashboard");
  }

  return <>{children}</>;
} 