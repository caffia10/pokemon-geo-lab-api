import { buildingRelations } from 'src/building/infrastructure/building.relation-schema';
import { buildingTable } from 'src/building/infrastructure/building.schema';
import { regionRelations } from 'src/region/infrastructure/region.relation-schema';
import { regionTable } from 'src/region/infrastructure/region.schema';
import { townRelations } from 'src/town/infrastructure/town.relation-schema';
import { townTable } from 'src/town/infrastructure/town.schema';

export const schema = {
  buildingTable,
  townTable,
  regionTable,
  regionRelations,
  townRelations,
  buildingRelations,
};
