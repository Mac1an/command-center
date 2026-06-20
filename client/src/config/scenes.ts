export type SceneCategory = 'work' | 'brand';

export interface Scene {
	id: string;
	label: string;
	category: SceneCategory;
	durationMs: number;
}

export const SCENES: Scene[] = [
	{ id: 'linear', label: 'Sprint Board', category: 'work', durationMs: 10000 },
	{ id: 'moxie', label: 'Client Pipeline', category: 'work', durationMs: 10000 },
	{ id: 'github', label: 'GitHub', category: 'work', durationMs: 10000 },
	{ id: 'wpe', label: 'Site Health', category: 'work', durationMs: 10000 },
	{ id: 'calendar', label: 'Calendar', category: 'work', durationMs: 10000 },
	{ id: 'brand', label: 'LevelUp Web', category: 'brand', durationMs: 12000 },
	{ id: 'portfolio', label: 'Portfolio', category: 'brand', durationMs: 12000 },
];
