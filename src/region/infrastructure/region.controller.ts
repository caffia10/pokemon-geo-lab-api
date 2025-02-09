import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import {
  CreateRegionUseCase,
  GetByIdRegionUseCase,
} from '../application/usecases.interfaces';
import pino from 'pino';
import { IsString, IsNotEmpty } from 'class-validator';

class CreateRegionRequest {
  @IsString()
  @IsNotEmpty()
  name: string;
}

interface RegionResponse {
  id: string;
  name: string;
}

@Controller('regions')
export class RegionController {
  constructor(
    @Inject('LOGGER')
    private readonly logger: pino.Logger,
    @Inject(CreateRegionUseCase)
    private readonly createBuildingUseCase: CreateRegionUseCase,
    @Inject(GetByIdRegionUseCase)
    private readonly getByIdBuildingUseCase: GetByIdRegionUseCase,
  ) {}

  @Post()
  async createBuilding(
    @Body() createRegionRequest: CreateRegionRequest,
  ): Promise<void> {
    try {
      this.logger.info(
        createRegionRequest,
        '[RegionController]creating region',
      );
      await this.createBuildingUseCase.do(createRegionRequest.name);
    } catch (error) {
      this.logger.error(
        { error: error, request: createRegionRequest },
        '[RegionController] error at creating region',
      );
    }
  }

  @Get(':id')
  async retrieveBuilding(@Param('id') id: string): Promise<RegionResponse> {
    try {
      this.logger.info({ id }, 'retrieving region');
      return await this.getByIdBuildingUseCase.do(id);
    } catch (error) {
      this.logger.error({ error, id }, 'error at retrieving Building');
    }
  }
}
