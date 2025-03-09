import { relations } from 'drizzle-orm';
import { buildingTable } from './building.schema';
import { townTable } from 'src/town/infrastructure/town.schema';

export const buildingRelations = relations(buildingTable, ({ one }) => ({
  town: one(townTable, {
    fields: [buildingTable.townId],
    references: [townTable.id],
  }),
}));
