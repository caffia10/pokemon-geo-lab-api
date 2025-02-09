import { varchar, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { regionTable } from 'src/region/infrastructure/region.schema';

export const townTable = pgTable('town', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 150 }).notNull(),
  region: uuid('region_id')
    .notNull()
    .references(() => regionTable.id),
  created_at: timestamp('created_at'),
});
