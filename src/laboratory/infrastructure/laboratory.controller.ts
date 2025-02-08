import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import {
  CreateLaboratoryUseCase,
  GetByIdLaboratoryUseCase,
} from '../application/usecases.interfaces';
import pino from 'pino';
import { IsString, IsNotEmpty } from 'class-validator';

class CreateLaboratoryRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsString()
  @IsNotEmpty()
  town: string;
}

interface LaboratoryResponse {
  name: string;
  region: string;
  town: string;
}

@Controller('Laboratorys')
export class CreateLaboratoryController {
  constructor(
    @Inject('LOGGER')
    private readonly logger: pino.Logger,
    @Inject(CreateLaboratoryUseCase)
    private readonly createLaboratoryUseCase: CreateLaboratoryUseCase,
    @Inject(GetByIdLaboratoryUseCase)
    private readonly getByIdLaboratoryUseCase: GetByIdLaboratoryUseCase,
  ) {}

  @Post()
  async createLaboratory(
    createLaboratoryRequest: CreateLaboratoryRequest,
  ): Promise<void> {
    try {
      this.logger.info(createLaboratoryRequest, 'creting laboratory');
      await this.createLaboratoryUseCase.do(createLaboratoryRequest);
    } catch (error) {
      this.logger.error(
        { error, createLaboratoryRequest },
        'error at creatig Laboratory',
      );
    }
  }

  @Get(':id')
  async retrieveLaboratory(
    @Param('id') id: string,
  ): Promise<LaboratoryResponse> {
    try {
      this.logger.info({ id }, 'retrieving laboratory');
      return await this.getByIdLaboratoryUseCase.do(id);
    } catch (error) {
      this.logger.error({ error, id }, 'error at retrieving Laboratory');
    }
  }
}
