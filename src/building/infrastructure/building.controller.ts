import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import {
  CreateBuildingUseCase,
  GetByIdBuildingUseCase,
} from '../application/usecases.interfaces';
import pino from 'pino';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { buildingTypeEnum } from '../domain/building.types';

class CreateBuildingRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  townId: string;

  @IsString()
  @IsNotEmpty()
  type: buildingTypeEnum;
}

interface BuildingResponse {
  name: string;
  townId: string;
  type: buildingTypeEnum;
}

@Controller('buildings')
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
    @Body() createBuildingRequest: CreateBuildingRequest,
  ): Promise<void> {
    try {
      this.logger.info(
        { name: createBuildingRequest.name },
        'creting building',
      );
      await this.createBuildingUseCase.do(createBuildingRequest);
    } catch (error) {
      this.logger.error(
        {
          error: error.message,
          error_stack: error.stack,
          createBuildingRequest,
        },
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
