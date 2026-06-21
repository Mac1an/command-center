import type { SceneCategory } from '../config/scenes';

interface ProgressBarProps {
  progress: number;
  category: SceneCategory;
}

export function ProgressBar({ progress, category }: ProgressBarProps) {
  return (
    <div className="h-0.5 bg-white/5 flex-shrink-0">
      <div
        className={`h-full transition-none ${category === 'brand' ? 'bg-gradient-to-r from-[#39FF14] to-[#00FFFF]' : 'bg-gradient-to-r from-[#00FFFF] to-[#00BFFF]'}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
