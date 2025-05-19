import Image from 'next/image';
import { ReactNode } from 'react';

interface ActivityItemProps {
  title: string;
  time: string;
  icon?: string;
  iconComponent?: ReactNode;
  iconBgColor?: string;
}

export function ActivityItem({ 
  title, 
  time, 
  icon, 
  iconComponent,
  iconBgColor = "bg-zinc-100" 
}: ActivityItemProps) {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className={`${iconBgColor} rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center`}>
        {icon ? (
          <Image 
            src={icon} 
            alt="" 
            width={20} 
            height={20} 
          />
        ) : iconComponent ? (
          iconComponent
        ) : null}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-zinc-900 mb-1">{title}</p>
        <p className="text-xs text-zinc-500">{time}</p>
      </div>
    </div>
  );
} 