import Image from "next/image";
import { CreditCard } from "lucide-react";

interface PaymentMethodIconProps {
  type: string;
  className?: string;
}

export function PaymentMethodIcon({ type, className = "" }: PaymentMethodIconProps) {
  const iconPath = `/images/payment-icons/${type.toLowerCase()}.svg`;

  try {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <Image
          src={iconPath}
          alt={`${type} icon`}
          width={40}
          height={24}
          className="object-contain"
        />
      </div>
    );
  } catch {
    // Fallback to generic credit card icon if image is not available
    return (
      <div className={`flex items-center justify-center bg-zinc-100 rounded-md ${className}`}>
        <CreditCard className="h-6 w-6 text-zinc-500" />
      </div>
    );
  }
} 