import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  src?: string;
  alt: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function UserAvatar({ 
  src, 
  alt, 
  className = "", 
  size = "md" 
}: UserAvatarProps) {
  // Size maps based on the size prop
  const sizeMap = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10"
  };

  const sizeClass = sizeMap[size];
  
  // Get initials from the alt text (name)
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <Avatar className={`${sizeClass} ${className}`}>
      <AvatarImage 
        src={src} 
        alt={alt} 
        className="object-cover"
      />
      <AvatarFallback>
        {src ? (
          <User className="h-4 w-4 text-zinc-500" />
        ) : (
          <span className="text-xs font-medium">{getInitials(alt)}</span>
        )}
      </AvatarFallback>
    </Avatar>
  );
} 