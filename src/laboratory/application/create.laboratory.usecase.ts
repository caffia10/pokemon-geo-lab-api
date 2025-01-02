import { Inject, Injectable } from '@nestjs/common';
import { LaboratoryDto } from '../domain/laboratory.model';
import { CreateLaboratoryUseCase } from './usecases.interfaces';
import { LaboratoryRepository } from '../domain/laboratory.repository';

@Injectable()
export class DefaultCreateLaboratoryUseCase implements CreateLaboratoryUseCase {
  constructor(
    @Inject(LaboratoryRepository)
    private readonly repository: LaboratoryRepository,
  ) {}

  async do(Laboratory: LaboratoryDto): Promise<void> {
    await this.repository.create(Laboratory);
  }
}
