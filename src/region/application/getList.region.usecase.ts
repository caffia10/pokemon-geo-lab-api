import { Inject, Injectable } from '@nestjs/common';
import { GetRegionListUseCase } from './usecases.interfaces';
import { Region, RegionRepository } from '../domain/region.types';

@Injectable()
export class DefaultGetProfessorListUseCase implements GetRegionListUseCase {
  constructor(
    @Inject(RegionRepository)
    private readonly repository: RegionRepository,
  ) {}

  async do(): Promise<Region[]> {
    return await this.repository.getList();
  }
}
