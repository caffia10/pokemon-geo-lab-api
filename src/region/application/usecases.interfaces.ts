import { Region } from '../domain/region.types';

export interface CreateRegionUseCase {
  do(name: string): Promise<void>;
}

export interface GetByIdRegionUseCase {
  do(id: string): Promise<Region>;
}

export interface GetRegionListUseCase {
  do(): Promise<Region[]>;
}

export const CreateRegionUseCase = Symbol('CreateRegionUseCase');
export const GetByIdRegionUseCase = Symbol('GetByIdRegionUseCase');
export const GetRegionListUseCase = Symbol('GetRegionListUseCase');
