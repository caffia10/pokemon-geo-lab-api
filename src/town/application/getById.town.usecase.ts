import { Inject, Injectable } from '@nestjs/common';
import { GetByIdTownUseCase } from './usecases.interfaces';
import { Town, TownRepository } from '../domain/town.types';

@Injectable()
export class DefaultGetByIdTownUseCase implements GetByIdTownUseCase {
  constructor(
    @Inject(TownRepository)
    private readonly repository: TownRepository,
  ) {}

  async do(id: string): Promise<Town> {
    return await this.repository.getById(id);
  }
}
