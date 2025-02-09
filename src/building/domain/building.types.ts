export interface Building {
  id: string;
  name: string;
  region: string;
  town: string;
}

export type BuildingDto = Omit<Building, 'id'>;

export interface BuildingRepository {
  create(building: BuildingDto): Promise<void>;
  getById(id: string): Promise<Building>;
}

export const BuildingRepository = Symbol('BuildingRepository');
