import { LightbulbIcon } from 'lucide-react';

interface TipCardProps {
  title?: string;
  content: string;
}

export function TipCard({ title = "Pro Tip", content }: TipCardProps) {
  return (
    <div className="bg-zinc-100 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-zinc-900 rounded-full w-6 h-6 flex items-center justify-center">
          <LightbulbIcon className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-semibold text-zinc-900">{title}</h3>
      </div>
      
      <p className="text-sm text-zinc-600">{content}</p>
    </div>
  );
} 