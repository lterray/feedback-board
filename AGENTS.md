# AGENTS.md

Feedback board: Angular app in `apps/web`, NestJS API in `apps/api`, npm workspaces. Requirements: `docs/requirements.md`. Use the terms in `GLOSSARY.md`; decisions are in `docs/adr/`.

- Node from `.nvmrc`, npm only (`packageManager` in `package.json`). Install with `npm ci`.
- `npm run check:fast`: format, lint, unit tests. Run it before you finish; a Stop hook runs it too.
- `npm run check`: everything CI runs, adding type check, builds, coverage, Knip, architecture rules and Playwright.
- Add a dependency to the app that uses it: `npm install <pkg> -w web` or `-w api`.
- `apps/web` and `apps/api` never import each other; they talk over HTTP. dependency-cruiser enforces it.
- Validate API input with Zod schemas through Nest's `StandardSchemaValidationPipe`, which is registered globally.
- Never raise a lint limit, lower a coverage floor or add an ignore to make a check pass. Fix the code, or ask.
- When you repeat a mistake, add a lint rule, test or hook for it, not more text here.
