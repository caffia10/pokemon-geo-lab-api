import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import {
  CreateBuildingUseCase,
  GetByIdBuildingUseCase,
} from '../application/usecases.interfaces';
import pino from 'pino';
import { IsString, IsNotEmpty } from 'class-validator';

class CreateBuildingRequest {
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

interface BuildingResponse {
  name: string;
  region: string;
  town: string;
}

@Controller('Buildings')
export class BuildingController {
  constructor(
    @Inject('LOGGER')
    private readonly logger: pino.Logger,
    @Inject(CreateBuildingUseCase)
    private readonly createBuildingUseCase: CreateBuildingUseCase,
    @Inject(GetByIdBuildingUseCase)
    private readonly getByIdBuildingUseCase: GetByIdBuildingUseCase,
  ) {}

  @Post()
  async createBuilding(
    createBuildingRequest: CreateBuildingRequest,
  ): Promise<void> {
    try {
      this.logger.info(
        { name: createBuildingRequest.name },
        'creting building',
      );
      await this.createBuildingUseCase.do(createBuildingRequest);
    } catch (error) {
      this.logger.error(
        { error, createBuildingRequest },
        'error at creatig Building',
      );
    }
  }

  @Get(':id')
  async retrieveBuilding(@Param('id') id: string): Promise<BuildingResponse> {
    try {
      this.logger.info({ id }, 'retrieving building');
      return await this.getByIdBuildingUseCase.do(id);
    } catch (error) {
      this.logger.error({ error, id }, 'error at retrieving Building');
    }
  }
}
