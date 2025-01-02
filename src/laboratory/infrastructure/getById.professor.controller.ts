import { Controller, Get, Inject, Param } from '@nestjs/common';
import { GetByIdLaboratoryUseCase } from '../application/usecases.interfaces';
import pino from 'pino';
import { LaboratoryResponse } from './Laboratory.shared.response';

@Controller('Laboratorys/get-by-id')
export class GetByIdLaboratoryController {
  constructor(
    @Inject(GetByIdLaboratoryUseCase)
    private readonly getByIdLaboratoryUseCase: GetByIdLaboratoryUseCase,
    @Inject('LOGGER') private readonly logger: pino.Logger,
  ) {}

  @Get(':id')
  async handle(@Param('id') id: string): Promise<LaboratoryResponse> {
    try {
      const Laboratory = await this.getByIdLaboratoryUseCase.do(id);
      this.logger.info({ id }, 'Laboratory retrieved');
      return Laboratory;
    } catch (error) {
      this.logger.error({ error, id }, 'error at retrieving Laboratory');
    }
  }
}
