import { Building } from 'src/building/domain/building.types';

export interface Town {
  id: string;
  name: string;
  regionId: string;
}

export interface TownDetailed extends Town {
  buildings: Building[];
}

export type TownDto = Omit<Town, 'id'>;

export interface TownRepository {
  create(town: TownDto): Promise<void>;
  getById(id: string): Promise<Town>;
}

export const TownRepository = Symbol('TownRepository');
