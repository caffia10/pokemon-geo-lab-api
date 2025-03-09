import { Inject, Injectable } from '@nestjs/common';
import { RetrieveFullRegionUseCase } from './usecases.interfaces';
import { RegionDetailed, RegionRepository } from '../domain/region.types';

@Injectable()
export class DefaultRetrieveFullRegionUseCase
  implements RetrieveFullRegionUseCase
{
  constructor(
    @Inject(RegionRepository)
    private readonly repository: RegionRepository,
  ) {}

  async do(id: string): Promise<RegionDetailed> {
    return await this.repository.retrieveFull(id);
  }
}
