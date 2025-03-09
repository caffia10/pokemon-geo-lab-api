import { Region, RegionDetailed } from '../domain/region.types';

export interface CreateRegionUseCase {
  do(name: string): Promise<void>;
}

export interface GetByIdRegionUseCase {
  do(id: string): Promise<Region>;
}

export interface GetRegionListUseCase {
  do(): Promise<Region[]>;
}

export interface RetrieveFullRegionUseCase {
  do(id: string): Promise<RegionDetailed>;
}

export const CreateRegionUseCase = Symbol('CreateRegionUseCase');
export const GetByIdRegionUseCase = Symbol('GetByIdRegionUseCase');
export const GetRegionListUseCase = Symbol('GetRegionListUseCase');
export const RetrieveFullRegionUseCase = Symbol('RetrieveFullRegionUseCase');
