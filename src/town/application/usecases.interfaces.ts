import { Town, TownDto } from '../domain/town.types';

export interface CreateTownUseCase {
  do(town: TownDto): Promise<void>;
}

export interface GetByIdTownUseCase {
  do(id: string): Promise<Town>;
}

export const CreateTownUseCase = Symbol('CreateTownUseCase');
export const GetByIdTownUseCase = Symbol('GetByIdTownUseCase');
