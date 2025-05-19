import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ActionCardProps {
  title: string;
  href: string;
  icon?: string;
  iconComponent?: ReactNode;
}

export function ActionCard({ title, href, icon, iconComponent }: ActionCardProps) {
  return (
    <Link 
      href={href}
      className="bg-zinc-100 hover:bg-zinc-200 transition-colors rounded-md p-4 flex flex-col items-center justify-center gap-3 text-center h-32"
    >
      <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
        {icon ? (
          <Image 
            src={icon} 
            alt="" 
            width={24} 
            height={24} 
          />
        ) : iconComponent ? (
          iconComponent
        ) : null}
      </div>
      <p className="font-medium text-zinc-900">{title}</p>
    </Link>
  );
} 