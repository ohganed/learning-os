# Data Compatibility Policy

Learning OS is expected to change frequently. User learning history must not be treated as disposable application state.

## Canonical storage
Current schema: `learningOS_db_v3`.

The schema is explicitly versioned with `schemaVersion` and migration history in `meta.migrations`.

## Legacy preservation
When v3 starts for the first time, it checks older known storage keys and migrates them into the v3 model. Before migration it preserves the raw legacy payload under `learningOS_legacy_backup_v1` when possible.

Known legacy keys currently checked:
- `learningOS_pwa_v1`
- `learningOS_v03`
- `learningOS_v02`
- `learningOS_v01`

## Rules for all future upgrades
1. Never silently delete an old storage key during migration.
2. Migration must be additive and idempotent where practical.
3. Records should prefer append/revise semantics over destructive overwrite.
4. Every meaningful event must carry a complete ISO datetime, not only a clock time or date label.
5. Stable IDs must be used for nodes, sessions, records, and relations.
6. UI categories must not be assumed to be permanent database categories.
7. New versions must be able to import and merge a JSON backup.
8. Export must remain available before any future destructive operation is introduced.
9. Future cloud/server sync should sync this durable model rather than replace it.

## Backup
The Data screen supports JSON export and merge-style import. A backup contains the versioned durable model: nodes, sessions, atomic records, relations, and migration metadata.
