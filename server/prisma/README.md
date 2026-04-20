# Prisma Database Workflow

## When to use `npm run db:migrate`

- **After you change your Prisma schema** (e.g., add/edit models, fields, enums) and want to apply those changes to your database.
- This command creates a new migration file and updates your database schema.
- It also runs `prisma generate` automatically to update the Prisma Client.

**Usage:**

```bash
npm run db:migrate --name <migration-name>
```

---

## When to use `npm run db:generate`

- **After you change your Prisma schema** and want to update the generated Prisma Client code, but do NOT want to run a migration (e.g., after pulling schema changes from another branch, or after running a migration separately).
- This command only updates the generated client code in `src/generated/prisma`.

**Usage:**

```bash
npm run db:generate
```

---

## Typical Workflow

1. Edit `schema.prisma` to change your data model.
2. Run `npm run db:migrate --name <desc>` to create and apply a migration.
   - This also updates the Prisma Client.
3. If you only need to update the client (e.g., after pulling new migrations), run `npm run db:generate`.

---

## Other Useful Commands

- `npm run db:reset` — Reset the database and apply all migrations from scratch.
- `npm run db:seed` — Run the seed script to populate the database with test data.
- `npm run db:studio` — Open Prisma Studio (GUI for your data).

---

## Notes

- Always commit your migration files after running a migration.
- If you change the schema but do not run a migration, the database and client may be out of sync.
- For more, see the [Prisma docs](https://www.prisma.io/docs/).
