# AGENTS.md (api)

- NestJS 12 is likely newer than you know: https://docs.nestjs.com/llms.txt indexes its docs. The `nestjs*` skills cover common mistakes.
- ESM only: relative imports end in `.js`, use `import.meta.dirname`, mocks are `vi.fn()`.
- Unit tests sit beside the code as `*.spec.ts`; HTTP-level tests are in `test/` (`npm run test:e2e -w api`).
- Check Nest's first-party packages before adding a library for configuration, persistence or validation.
