import { useSceneRotation } from './hooks/useSceneRotation';
import { SCENES } from './config/scenes';
import { Header } from './components/Header';

function App() {
	const { currentScene, currentIndex, progress, isPaused, goToScene, togglePause } = useSceneRotation();

	return (
		<div className="min-h-screen bg-[#080C10] flex flex-col overflow-hidden">
			<Header currentScene={currentScene} isPaused={isPaused} onTogglePause={togglePause} />

			{/* Progress bar */}
			<div className="h-0.5 bg-white/5 flex-shrink-0">
				<div className={`h-full transition-none ${currentScene.category === 'brand' ? 'bg-gradient-to-r from-[#39FF14] to-[#00FFFF]' : 'bg-gradient-to-r from-[#00FFFF] to-[#00BFFF]'}`} style={{ width: `${progress}%` }} />
			</div>

			{/* Scene area */}
			<div key={currentScene.id} className="scene-enter flex-1 flex items-center justify-center p-8">
				<div className="text-center">
					<div className="font-mono text-xs text-white/20 uppercase tracking-widest mb-4">Now Showing</div>
					<h1 className={`text-6xl font-bold mb-4 ${currentScene.category === 'brand' ? 'text-[#39FF14]' : 'text-[#00FFFF]'}`}>{currentScene.label}</h1>
					<p className="font-mono text-white/30 text-sm">
						Scene {currentIndex + 1} of {SCENES.length} · {currentScene.category} mode
					</p>
					<p className="font-mono text-white/20 text-xs mt-2">{isPaused ? 'Paused' : `${Math.round(progress)}% complete`}</p>
				</div>
			</div>

			{/* Footer nav */}
			<div className="flex items-center justify-center gap-2 px-8 py-4 border-t border-white/5 flex-shrink-0">
				{SCENES.map((scene, i) => (
					<button key={scene.id} onClick={() => goToScene(i)} className={`font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded-md border transition-all ${i === currentIndex ? (scene.category === 'brand' ? 'border-[#39FF14]/40 bg-[#39FF14]/10 text-[#39FF14]' : 'border-[#00FFFF]/40 bg-[#00FFFF]/10 text-[#00FFFF]') : 'border-white/7 text-white/20 hover:text-white/40'}`}>
						{scene.label}
					</button>
				))}
			</div>
		</div>
	);
}

export default App;
