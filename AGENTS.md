# Repository Guidelines

## Project Structure & Module Organization
- Source: `src/` (entry: `src/main.ts`, global styles: `src/styles.css`).
- App code: `src/app/` (standalone components, routes in `app.routes.ts`, root in `app.ts`, template in `app.html`).
- Static assets: `public/` (e.g., `public/favicon.ico`) are copied as-is by the build.
- Data: `src/wedding_menu_full.json` contains menu content used by the UI.

## Build, Test, and Development Commands
- `npm start` — run locally with Angular dev server.
- `npm run build` — production build (default configuration in `angular.json`).
- `npm run watch` — rebuild on change with development config.
- `npm test` — run unit tests with Karma + Jasmine.
Prereqs: Node.js LTS and Angular CLI (via local `@angular/cli` in `node_modules`).

## Coding Style & Naming Conventions
- Indentation: 2 spaces; UTF‑8; trim trailing whitespace (`.editorconfig`).
- Quotes: single quotes in TypeScript; Prettier enforces `printWidth: 100` and Angular HTML parser.
- File names: kebab‑case for files (e.g., `menu-section.component.ts`); classes in PascalCase (e.g., `MenuSection`).
- Keep styles co-located (`.css`) with components when possible; avoid global styles unless shared.

## Testing Guidelines
- Frameworks: Jasmine + Karma (`*.spec.ts` beside units, e.g., `src/app/app.spec.ts`).
- Write tests for components, pipes, and route logic; prefer shallow tests unless integration is needed.
- Coverage: no strict threshold; aim for critical path coverage and regression tests around menu rendering.
- Run locally with `npm test`; keep tests deterministic (no timers/network).

## Commit & Pull Request Guidelines
- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`.
- Scope changes narrowly; one feature/fix per PR. Include a clear description, linked issue, and screenshots/GIFs for UI changes.
- Update docs/tests when behavior or JSON structure changes. Note any `angular.json` or route updates.

## Security & Configuration Tips
- Do not store secrets in the repo; files under `src/` and `public/` are bundled and publicly served.
- Prefer configuration via build-time constants or environment-specific JSON that contains no sensitive data.

## Agent-Specific Instructions
- Keep changes minimal and consistent with existing patterns; avoid unnecessary file moves/renames.
- When modifying components, update/add corresponding `*.spec.ts`.
- Do not add new dependencies without prior discussion.
