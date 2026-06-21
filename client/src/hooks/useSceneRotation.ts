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
  const animFrameRef = useRef<number>(0);
  const progressRef = useRef<number>(0);

  const currentScene = SCENES[currentIndex];

  const goToScene = useCallback((index: number) => {
    cancelAnimationFrame(animFrameRef.current);
    progressRef.current = 0;
    setProgress(0);
    setCurrentIndex(index);
    setIsPaused(false);
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused(p => !p);
  }, []);

  useEffect(() => {
    if (isPaused) {
      cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const duration = currentScene.durationMs;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      progressRef.current = Math.min(progressRef.current + (delta / duration) * 100, 100);
      setProgress(progressRef.current);

      if (progressRef.current >= 100) {
        progressRef.current = 0;
        setCurrentIndex(i => (i + 1) % SCENES.length);
        setProgress(0);
      } else {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [currentIndex, isPaused, currentScene.durationMs]);

  return { currentScene, currentIndex, progress, isPaused, goToScene, togglePause };
}
