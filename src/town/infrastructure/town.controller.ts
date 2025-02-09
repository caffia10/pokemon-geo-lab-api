import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import {
  CreateTownUseCase,
  GetByIdTownUseCase,
} from '../application/usecases.interfaces';
import pino from 'pino';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

class CreateTownRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  region: string;
}

interface TownResponse {
  id: string;
  name: string;
  region: string;
}

@Controller('Towns')
export class TownController {
  constructor(
    @Inject('LOGGER')
    private readonly logger: pino.Logger,
    @Inject(CreateTownUseCase)
    private readonly createTownUseCase: CreateTownUseCase,
    @Inject(GetByIdTownUseCase)
    private readonly getByIdTownUseCase: GetByIdTownUseCase,
  ) {}

  @Post()
  async createTown(createTownRequest: CreateTownRequest): Promise<void> {
    try {
      this.logger.info({ name: createTownRequest.name }, 'creting town');
      await this.createTownUseCase.do(createTownRequest);
    } catch (error) {
      this.logger.error({ error, createTownRequest }, 'error at creatig Town');
    }
  }

  @Get(':id')
  async retrieveTown(@Param('id') id: string): Promise<TownResponse> {
    try {
      this.logger.info({ id }, 'retrieving town');
      return await this.getByIdTownUseCase.do(id);
    } catch (error) {
      this.logger.error({ error, id }, 'error at retrieving Town');
    }
  }
}
