export interface Region {
  id: string;
  name: string;
}

export interface RegionRepository {
  create(region: string): Promise<void>;
  getById(id: string): Promise<Region>;
  getList(): Promise<Region[]>;
}

export const RegionRepository = Symbol('RegionRepository');
