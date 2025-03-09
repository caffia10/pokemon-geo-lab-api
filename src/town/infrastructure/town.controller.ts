import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
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
  regionId: string;
}

interface TownResponse {
  id: string;
  name: string;
  regionId: string;
}

@Controller('towns')
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
  async createTown(
    @Body() createTownRequest: CreateTownRequest,
  ): Promise<void> {
    try {
      this.logger.info({ name: createTownRequest.name }, 'creting town');
      await this.createTownUseCase.do(createTownRequest);
    } catch (error) {
      this.logger.error(
        {
          error: error.message,
          error_stack: error.stack,
          createTownRequest,
        },
        'error at creatig Town',
      );
    }
  }

  @Get(':id')
  async retrieveTown(@Param('id') id: string): Promise<TownResponse> {
    try {
      this.logger.info({ id }, 'retrieving town');
      return await this.getByIdTownUseCase.do(id);
    } catch (error) {
      this.logger.error({ error: error.stack, id }, 'error at retrieving Town');
    }
  }
}
