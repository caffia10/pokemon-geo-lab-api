import { varchar, pgTable, timestamp, uuid, pgEnum } from 'drizzle-orm/pg-core';
import { townTable } from 'src/town/infrastructure/town.schema';

export const typeEnum = pgEnum('types', [
  'center',
  'laboratory',
  'gym',
  'police',
  'house',
  'unknown',
]);

export const buildingTable = pgTable('building', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 150 }).notNull(),
  town: uuid('town_id')
    .notNull()
    .references(() => townTable.id),
  type: typeEnum().default('unknown'),
  created_at: timestamp('created_at'),
});
