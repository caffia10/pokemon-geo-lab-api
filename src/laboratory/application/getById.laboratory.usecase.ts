import { Inject, Injectable } from '@nestjs/common';
import { GetByIdLaboratoryUseCase } from './usecases.interfaces';
import { LaboratoryRepository } from '../domain/laboratory.repository';
import { Laboratory } from '../domain/laboratory.model';

@Injectable()
export class DefaultGetByIdLaboratoryUseCase
  implements GetByIdLaboratoryUseCase
{
  constructor(
    @Inject(LaboratoryRepository)
    private readonly repository: LaboratoryRepository,
  ) {}

  async do(id: string): Promise<Laboratory> {
    return await this.repository.getById(id);
  }
}
