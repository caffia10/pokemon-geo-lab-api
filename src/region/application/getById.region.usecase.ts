import { Inject, Injectable } from '@nestjs/common';
import { GetByIdRegionUseCase } from './usecases.interfaces';
import { Region, RegionRepository } from '../domain/region.types';

@Injectable()
export class DefaultGetByIdRegionUseCase implements GetByIdRegionUseCase {
  constructor(
    @Inject(RegionRepository)
    private readonly repository: RegionRepository,
  ) {}

  async do(id: string): Promise<Region> {
    return await this.repository.getById(id);
  }
}
