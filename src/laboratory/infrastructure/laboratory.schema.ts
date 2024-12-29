import { varchar, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

export const laboratoryTable = pgTable('laboratory', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 150 }).notNull(),
  region: varchar('region', { length: 150 }).notNull(),
  town: varchar('town', { length: 150 }).notNull(),
  created_at: timestamp('created_at'),
});
