import { varchar, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { regionTable } from 'src/region/infrastructure/region.schema';

export const townTable = pgTable('town', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 150 }).notNull(),
  regionId: uuid('region_id')
    .notNull()
    .references(() => regionTable.id),
  createdAt: timestamp('created_at'),
});
