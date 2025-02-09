import { Inject, Injectable } from '@nestjs/common';
import { GetByIdBuildingUseCase } from './usecases.interfaces';
import { Building, BuildingRepository } from '../domain/building.types';

@Injectable()
export class DefaultGetByIdBuildingUseCase implements GetByIdBuildingUseCase {
  constructor(
    @Inject(BuildingRepository)
    private readonly repository: BuildingRepository,
  ) {}

  async do(id: string): Promise<Building> {
    return await this.repository.getById(id);
  }
}
