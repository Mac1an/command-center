import type { Scene } from '../config/scenes';

interface FooterProps {
  scenes: Scene[];
  currentIndex: number;
  onGoToScene: (index: number) => void;
}

export function Footer({ scenes, currentIndex, onGoToScene }: FooterProps) {
  return (
    <div className="flex items-center justify-between px-8 py-4 border-t border-white/5 flex-shrink-0">
      {/* Scene nav buttons */}
      <div className="flex items-center gap-2">
        {scenes.map((scene, i) => (
          <button
            key={scene.id}
            onClick={() => onGoToScene(i)}
            className={`font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded-md border transition-all ${i === currentIndex ? (scene.category === 'brand' ? 'border-[#39FF14]/40 bg-[#39FF14]/10 text-[#39FF14]' : 'border-[#00FFFF]/40 bg-[#00FFFF]/10 text-[#00FFFF]') : 'border-white/7 text-white/20 hover:text-white/40'}`}
          >
            {scene.label}
          </button>
        ))}
      </div>

      {/* Status indicator */}
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
        <span className="font-mono text-xs text-white/20 uppercase tracking-widest">
          LevelUp Web · Palm Coast, FL
        </span>
      </div>
    </div>
  );
}
