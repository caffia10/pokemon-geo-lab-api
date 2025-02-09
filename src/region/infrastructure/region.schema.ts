import { varchar, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

export const regionTable = pgTable('region', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 150 }).notNull(),
  created_at: timestamp('created_at'),
});
