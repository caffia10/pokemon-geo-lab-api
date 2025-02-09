import { Building, BuildingDto } from '../domain/building.types';

export interface CreateBuildingUseCase {
  do(building: BuildingDto): Promise<void>;
}

export interface GetByIdBuildingUseCase {
  do(id: string): Promise<Building>;
}

export const CreateBuildingUseCase = Symbol('CreateBuildingUseCase');
export const GetByIdBuildingUseCase = Symbol('GetByIdBuildingUseCase');
