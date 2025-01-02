import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateLaboratoryUseCase } from '../application/usecases.interfaces';
import pino from 'pino';
import { laboratoryTable } from './laboratory.schema';
import { LaboratoryRepository } from '../domain/laboratory.repository';

interface CreateLaboratoryRequest {
  name: string;
  region: string;
  town: string;
}

@Controller('Laboratorys/create')
export class CreateLaboratoryController {
  constructor(
    @Inject(CreateLaboratoryUseCase)
    private readonly createLaboratoryUseCase: CreateLaboratoryUseCase,
    @Inject('LOGGER') private readonly logger: pino.Logger,
  ) {}

  @Post()
  async handle(
    @Body() createLaboratoryRequest: CreateLaboratoryRequest,
  ): Promise<void> {
    try {
      await this.createLaboratoryUseCase.do(createLaboratoryRequest);
      this.logger.info(createLaboratoryRequest, 'Laboratory created');
    } catch (error) {
      this.logger.error(
        { error, createLaboratoryRequest },
        'error at creatig Laboratory',
      );
    }
  }
}
