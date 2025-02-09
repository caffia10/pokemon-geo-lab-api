import { Inject, Injectable } from '@nestjs/common';
import { TownDto, TownRepository } from '../domain/town.types';
import { CreateTownUseCase } from './usecases.interfaces';

@Injectable()
export class DefaultCreateTownUseCase implements CreateTownUseCase {
  constructor(
    @Inject(TownRepository)
    private readonly repository: TownRepository,
  ) {}

  async do(Town: TownDto): Promise<void> {
    await this.repository.create(Town);
  }
}
