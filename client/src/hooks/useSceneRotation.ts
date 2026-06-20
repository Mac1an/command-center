import { useState, useEffect, useRef, useCallback } from 'react';
import { SCENES } from '../config/scenes';
import type { Scene } from '../config/scenes';

interface UseSceneRotationReturn {
	currentScene: Scene;
	currentIndex: number;
	progress: number;
	isPaused: boolean;
	goToScene: (index: number) => void;
	togglePause: () => void;
}

export function useSceneRotation(): UseSceneRotationReturn {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [progress, setProgress] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const startTimeRef = useRef<number>(0);
	const animFrameRef = useRef<number>(0);

	const currentScene = SCENES[currentIndex];

	const goToScene = useCallback((index: number) => {
		setCurrentIndex(index);
		setProgress(0);
		startTimeRef.current = Date.now();
	}, []);

	const togglePause = useCallback(() => {
		setIsPaused((p) => !p);
	}, []);

	useEffect(() => {
		if (isPaused) return;

		const tick = () => {
			const elapsed = Date.now() - startTimeRef.current;
			const pct = Math.min(elapsed / currentScene.durationMs, 1);
			setProgress(pct * 100);

			if (pct >= 1) {
				const next = (currentIndex + 1) % SCENES.length;
				setCurrentIndex(next);
				setProgress(0);
				startTimeRef.current = Date.now();
			} else {
				animFrameRef.current = requestAnimationFrame(tick);
			}
		};

		animFrameRef.current = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(animFrameRef.current);
	}, [currentIndex, isPaused, currentScene.durationMs]);

	return { currentScene, currentIndex, progress, isPaused, goToScene, togglePause };
}
