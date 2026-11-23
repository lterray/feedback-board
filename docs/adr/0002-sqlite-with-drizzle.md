# SQLite through Drizzle and libSQL's local-file client

V1 runs on one machine with no hosted instance, so one SQLite file is enough storage. We use Drizzle through Nest's `@nestjs/drizzle` integration, with libSQL's client opening a local file: the schema is TypeScript close to SQL, and unique constraints and migrations are built in. The libSQL client also ships prebuilt binaries, which matters because npm 12 blocks the native build step that the more common better-sqlite3 driver needs.

## Considered options

- **TypeORM with better-sqlite3:** mature Nest integration, but decorator-heavy entities, and the driver's native build has to be approved under npm 12.
- **Drizzle wired up as our own Nest provider:** the fallback if `@nestjs/drizzle`, at version 0.0.2 when chosen, gets in the way. It costs about 20 lines and changes nothing else.

## Consequences

A later shared hosted instance means moving to a server database such as PostgreSQL. Drizzle supports it, but the schema dialect and migrations change.
