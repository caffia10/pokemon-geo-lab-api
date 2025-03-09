export enum buildingTypeEnum {
  Center = 'center',
  laboratory = 'laboratory',
  Gym = 'gym',
  Police = 'police',
  House = 'house',
  Unknown = 'unkown',
}

export interface Building {
  id: string;
  name: string;
  townId: string;
  type: buildingTypeEnum;
}

export type BuildingDto = Omit<Building, 'id'>;

export interface BuildingRepository {
  create(building: BuildingDto): Promise<void>;
  getById(id: string): Promise<Building>;
}

export const BuildingRepository = Symbol('BuildingRepository');
