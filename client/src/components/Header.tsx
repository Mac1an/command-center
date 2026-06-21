import { useState, useEffect } from 'react';
import type { Scene } from '../config/scenes';

interface HeaderProps {
	currentScene: Scene;
	isPaused: boolean;
	onTogglePause: () => void;
}

function Clock() {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => setTime(new Date()), 1000);
		return () => clearInterval(interval);
	}, []);

	const hours = time.getHours() % 12 || 12;
	const minutes = time.getMinutes().toString().padStart(2, '0');
	const seconds = time.getSeconds().toString().padStart(2, '0');
	const ampm = time.getHours() >= 12 ? 'PM' : 'AM';
	const date = time.toLocaleDateString('en-US', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
	});

	return (
		<div className="text-right">
			<div className="font-mono text-xl font-bold text-white/80 tracking-widest">
				{hours}:{minutes}
				<span className="text-[#00FFFF]">:{seconds}</span>
				<span className="text-white/30 text-sm ml-1">{ampm}</span>
			</div>
			<div className="font-mono text-xs text-white/20 uppercase tracking-widest mt-0.5">{date}</div>
		</div>
	);
}

function WeatherBadge() {
	return (
		<div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
			<span>⛅</span>
			<div>
				<div className="font-mono text-sm font-bold text-white/70 leading-none">82°F</div>
				<div className="font-mono text-xs text-white/20 leading-none mt-0.5">Palm Coast, FL</div>
			</div>
		</div>
	);
}

export function Header({ currentScene, isPaused, onTogglePause }: HeaderProps) {
	return (
		<div className="flex items-center justify-between px-8 py-4 border-b border-white/5 flex-shrink-0">
			{/* Left — branding + mode indicator */}
			<div className="flex items-center gap-4">
				<span className="font-mono text-sm font-bold tracking-[0.2em] text-[#00FFFF]">COMMAND CENTER</span>
				<div className="w-px h-5 bg-white/10" />
				<div className="flex items-center gap-2">
					<div className={`w-2 h-2 rounded-full ${currentScene.category === 'brand' ? 'bg-[#39FF14]' : 'bg-[#00FFFF]'}`} />
					<span className="font-mono text-xs text-white/30 uppercase tracking-widest">
						{currentScene.category === 'brand' ? 'Brand Mode' : 'Work Mode'} · {currentScene.label}
					</span>
				</div>
			</div>

			{/* Right — weather, clock, pause */}
			<div className="flex items-center gap-6">
				<WeatherBadge />
				<Clock />
				<button onClick={onTogglePause} className="font-mono text-xs text-white/30 hover:text-white/60 transition-colors bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
					{isPaused ? '▶ Resume' : '⏸ Pause'}
				</button>
			</div>
		</div>
	);
}
