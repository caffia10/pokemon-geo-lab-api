import { Inject, Injectable } from '@nestjs/common';
import { BuildingDto, BuildingRepository } from '../domain/building.types';
import { CreateBuildingUseCase } from './usecases.interfaces';

@Injectable()
export class DefaultCreateBuildingUseCase implements CreateBuildingUseCase {
  constructor(
    @Inject(BuildingRepository)
    private readonly repository: BuildingRepository,
  ) {}

  async do(Building: BuildingDto): Promise<void> {
    await this.repository.create(Building);
  }
}
