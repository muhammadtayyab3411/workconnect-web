import Image from 'next/image';
import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: string;
  iconComponent?: ReactNode;
}

export function StatsCard({ title, value, icon, iconComponent }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-zinc-500">{title}</p>
          <p className="text-2xl font-bold text-zinc-900">{value}</p>
        </div>
        
        <div className="mt-1">
          {icon ? (
            <Image 
              src={icon} 
              alt="" 
              width={24} 
              height={24} 
              className="text-zinc-700" 
            />
          ) : iconComponent ? (
            iconComponent
          ) : null}
        </div>
      </div>
    </div>
  );
} 