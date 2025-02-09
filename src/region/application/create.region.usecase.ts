import { Inject, Injectable } from '@nestjs/common';
import { CreateRegionUseCase } from './usecases.interfaces';
import { RegionRepository } from '../domain/region.types';

@Injectable()
export class DefaultCreateRegionUseCase implements CreateRegionUseCase {
  constructor(
    @Inject(RegionRepository)
    private readonly repository: RegionRepository,
  ) {}

  async do(name: string): Promise<void> {
    await this.repository.create(name);
  }
}
