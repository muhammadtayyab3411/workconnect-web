import Image from 'next/image';
import { ReactNode } from 'react';
import { Clock } from 'lucide-react';

interface AppointmentItemProps {
  title: string;
  time: string;
  person: string;
  icon?: string;
  iconComponent?: ReactNode;
}

export function AppointmentItem({
  title,
  time,
  person,
  icon,
  iconComponent
}: AppointmentItemProps) {
  return (
    <div className="border-b border-zinc-200 py-4 last:border-0">
      <div className="flex items-start gap-3">
        <div className="bg-zinc-100 rounded-md w-10 h-10 flex-shrink-0 flex items-center justify-center">
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
          <p className="text-sm font-medium text-zinc-900">{title}</p>
          
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-zinc-400" />
              <span className="text-xs text-zinc-500">{time}</span>
            </div>
          </div>
          
          <p className="text-xs text-zinc-500 mt-1">with {person}</p>
        </div>
      </div>
    </div>
  );
} 