import { relations } from 'drizzle-orm';
import { buildingTable } from 'src/building/infrastructure/building.schema';
import { townTable } from './town.schema';
import { regionTable } from 'src/region/infrastructure/region.schema';

export const townRelations = relations(townTable, ({ many, one }) => ({
  buildings: many(buildingTable),
  region: one(regionTable, {
    fields: [townTable.regionId],
    references: [regionTable.id],
  }),
}));
