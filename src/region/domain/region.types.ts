import { TownDetailed } from 'src/town/domain/town.types';

export interface Region {
  id: string;
  name: string;
}

export interface RegionDetailed extends Region {
  towns: TownDetailed[];
}

export interface RegionRepository {
  create(region: string): Promise<void>;
  getById(id: string): Promise<Region>;
  retrieveFull(id: string): Promise<RegionDetailed>;
  getList(): Promise<Region[]>;
}

export const RegionRepository = Symbol('RegionRepository');
