export interface Town {
  id: string;
  name: string;
  region: string;
}

export type TownDto = Omit<Town, 'id'>;

export interface TownRepository {
  create(town: TownDto): Promise<void>;
  getById(id: string): Promise<Town>;
}

export const TownRepository = Symbol('TownRepository');
