import { useSceneRotation } from './hooks/useSceneRotation';
import { SCENES } from './config/scenes';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProgressBar } from './components/ProgressBar';

function App() {
	const { currentScene, currentIndex, progress, isPaused, goToScene, togglePause } = useSceneRotation();

	return (
		<div className="min-h-screen bg-[#080C10] flex flex-col overflow-hidden">
			<Header currentScene={currentScene} isPaused={isPaused} onTogglePause={togglePause} />

			<ProgressBar progress={progress} category={currentScene.category} />

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

			<Footer scenes={SCENES} currentIndex={currentIndex} onGoToScene={goToScene} />
		</div>
	);
}

export default App;
