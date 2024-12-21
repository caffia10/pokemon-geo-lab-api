import { integer, text, pgTable, timestamp } from 'drizzle-orm/pg-core';

export const laboratoryTable = pgTable('laboratory', {
  id: integer('id').primaryKey(),
  title: text('name'),
  content: text('region'),
  town: timestamp('town'),
  created_at: timestamp('created_at'),
});
