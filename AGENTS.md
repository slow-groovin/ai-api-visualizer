# AGENTS

## Project
- Name: ai-api-visualizer
- Purpose: Visualize request/response bodies for ChatGPT (Chat Completion), Claude, and Gemini APIs.
- Stack: Vite + Vue 3 + TypeScript + Tailwind CSS + Pinia.

## Working Agreements
- Prefer small, focused changes and keep diffs minimal.
- Avoid introducing new dependencies unless necessary.
- Keep ASCII-only edits unless the file already uses Unicode.

## Common Commands
- Dev server: `npm run dev`
- Build: `npm run build`
- Typecheck: `npm run tsc`
- Tests: `npm run test`
- Preview build: `npm run preview`

## Repo Layout
- Source: `src/`
- Static assets: `public/`
- Build output: `dist/`
- Tooling: `vite.config.ts`, `tailwind.config.js`, `tsconfig*.json`

## Notes
- The project is an ESM package (`"type": "module"`).
- Use `vue-tsc` for type checks.
