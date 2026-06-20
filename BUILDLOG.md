# Command Center — Build Log

A step-by-step developer journal documenting every decision, command, and configuration made during the build of the Command Center Raspberry Pi display project.

**Project:** Command Center Pi Display  
**Developer:** Garrett Johnson — Founder & CEO, LevelUp Web (levelupweb.io)  
**Repo:** https://github.com/Mac1an/command-center  
**Started:** May 11, 2026  
**Stack:** React, TypeScript, Vite, Tailwind CSS, Node.js, Express, pnpm  
**Hardware:** Raspberry Pi 4 (x2)

---

## Table of Contents

1. [Project Vision](#project-vision)
2. [Hardware Plan](#hardware-plan)
3. [Linear Workspace Setup](#linear-workspace-setup)
4. [GitHub Repository Setup](#github-repository-setup)
5. [COM-5 — Monorepo Structure](#com-5--monorepo-structure)
6. [COM-6 — React + TypeScript + Vite](#com-6--react--typescript--vite)
7. [COM-7 — Express Node.js Server](#com-7--express-nodejs-server)
8. [COM-8 — Tailwind CSS + Brand Tokens](#com-8--tailwind-css--brand-tokens)
9. [COM-9 — Scene Rotation Engine](#com-9--scene-rotation-engine)

---

## Project Vision

Command Center is a self-hosted Raspberry Pi 4 smart display that runs 24/7 on a wall-mounted TV in a home office. It rotates between live work utility dashboards and personal brand scenes.

**Why this project:**
- Genuinely useful tool for day-to-day work as a solo founder
- Full-stack portfolio piece demonstrating React, TypeScript, Node.js, and API integrations
- Case study for levelupweb.io
- Public GitHub repo showcasing real engineering practice

**Two Raspberry Pi 4s — kept separate:**
- Pi #1 → Command Center dashboard display
- Pi #2 → RetroPie arcade / retro gaming

They are kept separate because RetroPie owns the GPU and display output entirely. Sharing would create conflicts. Separation also future-proofs the arcade cabinet build.

**Scene rotation plan:**

| Scene | Data Source | Category |
|---|---|---|
| Linear Sprint Board | Linear GraphQL API | Work |
| Moxie Client Pipeline | Moxie API | Work |
| GitHub Activity | GitHub REST API | Work |
| WP Engine Site Health | WP Engine API | Work |
| Google Calendar | Google Calendar API | Work |
| LevelUp Web Showcase | Static | Brand |
| Portfolio Highlights | Static | Brand |

---

## Hardware Plan

### What was already owned
- 2x Raspberry Pi 4 (with cases)
- 2x NES Bluetooth controllers (8BitDo)
- 2x SNES Bluetooth controllers (8BitDo)
- Keyboard and mouse

### What to buy for both Pis
| Item | Est. Cost |
|---|---|
| MicroSD Card 128GB (Pi #2 RetroPie) | $15–20 |
| MicroSD Card 32GB (Pi #1 Command Center) | $8–10 |
| Official Pi 4 Power Supply x2 (USB-C 5.1V/3A) | $20–24 |
| Micro HDMI to HDMI cable x2 | $16–20 |
| Powered USB Hub 7-port | $25–35 |
| Retrode 2 + NES plugin (when ready) | $95–130 |

**Key hardware notes:**
- Must use a POWERED USB hub — unpowered hubs can cause the Pi to brown out
- Pi 4 has 2x USB 3.0 and 2x USB 2.0 (4 ports total)
- 8BitDo controllers pair via built-in Bluetooth — no USB port needed during gameplay
- Retrode 2 reads physical NES, SNES, and Genesis cartridges via USB and dumps ROMs for RetroPie

---

## Tech Stack Decisions

### Why Vite + React instead of Next.js
Next.js adds server-side rendering, file-based routing, and SEO optimization. None of that is needed for Command Center because:
- The app runs on a private TV, not indexed by Google
- No public URL — purely local on the Pi's network
- Vite is significantly faster for development
- Simpler deployment — just build static files, serve with Express

**Rule of thumb:**
- Vite + React = dashboards, tools, internal apps, anything without SEO needs
- Next.js = public websites, SEO-dependent apps, e-commerce, marketing sites

### Why pnpm instead of npm
- Faster installs
- More efficient disk usage (symlinks shared packages instead of duplicating)
- Better for monorepo setups
- Modern best practice worth highlighting in the case study

### Why self-hosted on Pi instead of Vercel
- Free forever — no hosting costs
- Works offline — no internet dependency to load the app
- API keys secured on device — never pass through cloud
- Instant local latency
- Complete privacy — data never leaves the local network

---

## Prerequisites Verified

```bash
node -v     # v23.4.0
npm -v      # 10.9.2
git -v      # git version 2.43.2
pnpm -v     # 10.30.0
```

---

## Linear Workspace Setup

**Why Linear over Jira or Trello:**
- Linear is what modern engineering teams use
- Clean GraphQL API — straightforward to integrate into the dashboard
- More impressive on a portfolio/case study than Trello
- GraphQL experience is worth mentioning in the case study

**Workspace:** Command Center (linear.app/command-center-gj)  
**Team:** Command Center  
**Identifier:** COM  
**Project:** Command Center Pi Display

**Epic labels created:**
| Label | Color |
|---|---|
| Epic: Foundation | Blue |
| Epic: Work Scenes | Green |
| Epic: Brand Scenes | Yellow |
| Epic: Pi Deployment | Orange |
| Epic: Portfolio Docs | Purple |

**Total issues:** 51 across 5 epics  
**Import method:** Manual creation using C shortcut in Linear, using grouped CSV as reference

---

## GitHub Repository Setup

**Repo:** https://github.com/Mac1an/command-center  
**Visibility:** Public (portfolio piece)  
**Branch:** main

**Decision:** Public repo from day one so the full commit history tells the build story. This is intentional for portfolio purposes.

---

## COM-5 — Monorepo Structure

**Issue:** Init monorepo structure (client + server folders)  
**Epic:** Foundation  
**Status:** Done

### What we built
A clean monorepo with separate `/client` and `/server` directories, shared `.gitignore`, and root `package.json`.

### Commands run
```bash
mkdir command-center && cd command-center
pnpm init
mkdir client server docs pi-setup
touch .gitignore .env.example README.md
echo "node_modules/
dist/
.env
.DS_Store
.pnpm-store/" > .gitignore
git init
git add .
git commit -m "init: project scaffold — COM-5"
git branch -M main
git remote add origin https://github.com/Mac1an/command-center.git
git push -u origin main
```

### Folder structure created
```
command-center/
├── client/          # React + TypeScript + Vite app (frontend)
├── server/          # Node.js + Express API server (backend)
├── docs/            # Architecture diagrams, screenshots
├── pi-setup/        # Shell scripts, systemd config, Pi deployment
├── .gitignore       # Ignores node_modules, dist, .env, .DS_Store
├── .env.example     # Template for environment variables
└── README.md        # Project README (written last)
```

### Key decisions
- **Monorepo** — client and server in one repo for simplicity. This is a solo project so the overhead of separate repos isn't worth it.
- **`docs/` and `pi-setup/` folders** added upfront so they're part of the repo structure from the start
- **`.env.example`** added early so all required variables get documented as we add them

---

## COM-6 — React + TypeScript + Vite

**Issue:** Scaffold React + TypeScript + Vite client app  
**Epic:** Foundation  
**Status:** Done

### What we built
Full React + TypeScript + Vite application scaffolded inside `/client`.

### Command run
```bash
pnpm create vite@latest client -- --template react-ts
# Selected: React framework, TypeScript variant
# Selected: Yes to install with pnpm and start now
```

### What Vite generated
```
client/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/          # Static files (images, icons)
│   ├── App.css          # Component styles (replaced with Tailwind)
│   ├── App.tsx          # Root React component
│   ├── index.css        # Global styles (replaced with Tailwind import)
│   └── main.tsx         # Entry point — mounts React into index.html
├── index.html           # Single HTML file, React injects into <div id="root">
├── tsconfig.json        # TypeScript config (references app + node configs)
├── tsconfig.app.json    # App-specific TS config
├── tsconfig.node.json   # Node-specific TS config
├── vite.config.ts       # Vite build tool configuration
└── package.json         # Dependencies and scripts
```

### Key file explanations
- **`main.tsx`** — Entry point. Mounts the React app into `<div id="root">` in index.html
- **`App.tsx`** — Root component. First thing that renders. We'll replace default content with our layout
- **`vite.config.ts`** — Configures the Vite build tool and plugins
- **`tsconfig.json`** — Tells TypeScript how strict to be and what to include
- **`pnpm-lock.yaml`** — Locks exact dependency versions so the app builds identically on any machine including the Pi

### Dev server
Runs at `http://localhost:5173`  
Hot Module Replacement (HMR) — saves auto-reload the browser instantly, no manual refresh needed

---

## COM-7 — Express Node.js Server

**Issue:** Set up Express Node.js server  
**Epic:** Foundation  
**Status:** Done

### What we built
Express server with TypeScript support running on port 3001. Handles all API integrations and keeps API keys off the client.

### Why a separate backend server
The Node.js server acts as a secure proxy between the React frontend and external APIs (Linear, GitHub, WP Engine etc.). This means:
- API keys never exposed to the browser
- CORS handled server-side
- API response caching possible
- Logic kept out of the frontend

### Commands run
```bash
cd server
pnpm init
pnpm add express cors dotenv
pnpm add -D typescript ts-node @types/node @types/express @types/cors nodemon
npx tsc --init
```

### What npx is
`npx` runs a package once without permanently installing it globally. `npx tsc --init` generates a `tsconfig.json` using TypeScript's compiler without a separate install step.

### Files created

**`server/src/index.ts`**
```typescript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Command Center server is running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Command Center server running on port ${PORT}`);
});

export default app;
```

**`server/package.json` scripts section**
```json
"scripts": {
  "dev": "nodemon --exec ts-node src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

**`server/tsconfig.json`** — had to troubleshoot due to TypeScript 6.0 requiring updated module settings:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "Node16",
    "moduleResolution": "node16",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Troubleshooting — TypeScript module error
**Error:** `ECMAScript imports and exports cannot be written in a CommonJS file under 'verbatimModuleSyntax'`

**Cause:** TypeScript 6.0 introduced stricter module handling. The default `tsconfig.json` generated by `tsc --init` used `"moduleResolution": "node"` which is deprecated in TS 6.0.

**Fix:** Updated `module` to `"Node16"` and `moduleResolution` to `"node16"` to match.

### Verified working
```
http://localhost:3001/health
```
Returns:
```json
{
  "status": "ok",
  "message": "Command Center server is running",
  "timestamp": "2026-06-20T17:28:37.590Z"
}
```

---

## COM-8 — Tailwind CSS + Brand Tokens

**Issue:** Configure Tailwind CSS with dark theme tokens  
**Epic:** Foundation  
**Status:** Done

### What we built
Tailwind CSS installed and configured in the Vite client using the official `@tailwindcss/vite` plugin. Brand color tokens defined as CSS custom properties.

### Commands run
```bash
cd client
pnpm add -D tailwindcss @tailwindcss/vite
```

### Files updated

**`client/vite.config.ts`**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

**`client/src/index.css`**
```css
@import "tailwindcss";

:root {
  --color-bg: #080C10;
  --color-cyan: #00FFFF;
  --color-lime: #39FF14;
  --color-pink: #FF2D78;
  --color-sky: #00BFFF;
  --color-surface: rgba(255,255,255,0.03);
  --color-border: rgba(255,255,255,0.06);
}
```

### Brand color reference
| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#080C10` | Page background (Stage Black) |
| `--color-cyan` | `#00FFFF` | Work mode accent (Player 2 Cyan) |
| `--color-lime` | `#39FF14` | LevelUp Web primary (Arcade Lime) |
| `--color-pink` | `#FF2D78` | LevelUp Web secondary (Game Over Pink) |
| `--color-sky` | `#00BFFF` | Supporting accent (Sky Boost) |
| `--color-surface` | `rgba(255,255,255,0.03)` | Card backgrounds |
| `--color-border` | `rgba(255,255,255,0.06)` | Card borders |

### Verified working
Replaced `App.tsx` with a test component using Tailwind utility classes and brand colors — dark background rendered with cyan heading and lime green tagline confirmed.

---

## COM-9 — Scene Rotation Engine

**Issue:** Build scene rotation engine with configurable timer  
**Epic:** Foundation  
**Status:** In Progress

### What we're building
The core rotation logic as a custom React hook (`useSceneRotation`). Timer-based, configurable duration per scene, supports pause/resume, cycles through scene list using `requestAnimationFrame` for smooth progress tracking.

### Folder structure added
```bash
mkdir -p src/scenes src/hooks src/components src/config src/types
```

### Files created

**`client/src/config/scenes.ts`** — single source of truth for all scene definitions:
```typescript
export type SceneCategory = 'work' | 'brand';

export interface Scene {
  id: string;
  label: string;
  category: SceneCategory;
  durationMs: number;
}

export const SCENES: Scene[] = [
  { id: 'linear',    label: 'Sprint Board',    category: 'work',  durationMs: 10000 },
  { id: 'moxie',     label: 'Client Pipeline', category: 'work',  durationMs: 10000 },
  { id: 'github',    label: 'GitHub',          category: 'work',  durationMs: 10000 },
  { id: 'wpe',       label: 'Site Health',     category: 'work',  durationMs: 10000 },
  { id: 'calendar',  label: 'Calendar',        category: 'work',  durationMs: 10000 },
  { id: 'brand',     label: 'LevelUp Web',     category: 'brand', durationMs: 12000 },
  { id: 'portfolio', label: 'Portfolio',       category: 'brand', durationMs: 12000 },
];
```

**`client/src/hooks/useSceneRotation.ts`** — custom React hook:
```typescript
import { useState, useEffect, useRef, useCallback } from 'react';
import { SCENES, Scene } from '../config/scenes';

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
  const startTimeRef = useRef(Date.now());
  const animFrameRef = useRef<number>(0);

  const currentScene = SCENES[currentIndex];

  const goToScene = useCallback((index: number) => {
    setCurrentIndex(index);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused(p => !p);
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
```

### Key concepts used
- **Custom React hook** — reusable logic extracted from components, prefixed with `use`
- **`requestAnimationFrame`** — browser API that calls a function before every repaint (~60fps). Used instead of `setInterval` for smooth progress bar animation
- **`useRef`** — stores mutable values that don't trigger re-renders (start time, animation frame ID)
- **`useCallback`** — memoizes functions so they don't get recreated on every render
- **Modulo operator `%`** — `(currentIndex + 1) % SCENES.length` wraps back to 0 after the last scene

---

## Concepts Learned

### What is a monorepo?
A single Git repository containing multiple related projects (client + server). Keeps everything in one place, one commit history, easier to manage for solo projects.

### What is HMR (Hot Module Replacement)?
When you save a file during development, Vite instantly updates just that module in the browser without a full page refresh. State is preserved. Makes development much faster.

### What is Express?
A minimal Node.js web framework. Handles HTTP requests and responses. Used here as an API server that the React frontend talks to.

### What is CORS?
Cross-Origin Resource Sharing. A browser security feature that blocks requests from one domain to another unless explicitly allowed. Our Express server uses the `cors` package to allow the React frontend (localhost:5173) to talk to the server (localhost:3001).

### What is dotenv?
A package that loads environment variables from a `.env` file into `process.env`. Keeps secrets like API keys out of the codebase.

### What is PM2?
A process manager for Node.js. Keeps the server running in the background, restarts it if it crashes, and can auto-start it on system boot. Used for Pi deployment.

### Vite vs Next.js — when to use what
- **Vite + React** — client-side apps, dashboards, tools, anything without SEO needs
- **Next.js** — public websites, SEO, server-side rendering, e-commerce, marketing sites

---

*This build log is updated as each issue is completed. Last updated: June 20, 2026.*
