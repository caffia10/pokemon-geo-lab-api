import { townTable } from 'src/town/infrastructure/town.schema';
import { regionTable } from './region.schema';
import { relations } from 'drizzle-orm';

export const regionRelations = relations(regionTable, ({ many }) => ({
  towns: many(townTable),
}));
