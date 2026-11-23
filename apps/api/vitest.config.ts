import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Resolves the path aliases declared in tsconfig.json, including the ones
  // added by `nest g library`. Requires Vite 8, which ships this option.
  resolve: { tsconfigPaths: true },
  test: {
    globals: true,
    root: './',
    include: ['**/*.spec.ts'],
    coverage: {
      include: ['src/**/*.ts'],
      // Modules are wiring; the e2e test in test/ covers them.
      exclude: ['src/main.ts', 'src/**/*.module.ts', 'src/**/*.spec.ts'],
      // A floor, not a target. Raise it as the code grows; never lower it to make a change pass.
      // Branches start at the measured 50%: decorator metadata emits a branch per injected class.
      thresholds: { lines: 80, statements: 80, functions: 80, branches: 50 },
    },
  },
});
