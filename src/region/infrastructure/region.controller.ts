import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import {
  CreateRegionUseCase,
  GetByIdRegionUseCase,
  RetrieveFullRegionUseCase,
} from '../application/usecases.interfaces';
import pino from 'pino';
import { IsString, IsNotEmpty } from 'class-validator';
import { RegionDetailed } from '../domain/region.types';

class CreateRegionRequest {
  @IsString()
  @IsNotEmpty()
  name: string;
}

interface RegionResponse {
  id: string;
  name: string;
}

// TODO : check if should omit some prop
type RegionDetailedResponse = RegionDetailed;

@Controller('regions')
export class RegionController {
  constructor(
    @Inject('LOGGER')
    private readonly logger: pino.Logger,
    @Inject(CreateRegionUseCase)
    private readonly createRegionUseCase: CreateRegionUseCase,
    @Inject(GetByIdRegionUseCase)
    private readonly getByIdRegionUseCase: GetByIdRegionUseCase,
    @Inject(RetrieveFullRegionUseCase)
    private readonly retrieveFullRegionUseCase: RetrieveFullRegionUseCase,
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
      await this.createRegionUseCase.do(createRegionRequest.name);
    } catch (error) {
      this.logger.error(
        {
          error: error.message,
          error_stack: error.stack,
          request: createRegionRequest,
        },
        '[RegionController] error at creating region',
      );
    }
  }

  @Get(':id')
  async retrieveRegion(@Param('id') id: string): Promise<RegionResponse> {
    try {
      this.logger.info({ id }, 'retrieving region');
      return await this.getByIdRegionUseCase.do(id);
    } catch (error) {
      this.logger.error({ error, id }, 'error at retrieving Region');
    }
  }

  @Get('full/:id')
  async retrieveFullRegion(
    @Param('id') id: string,
  ): Promise<RegionDetailedResponse> {
    try {
      this.logger.info({ id }, 'retrieving region');
      return await this.retrieveFullRegionUseCase.do(id);
    } catch (error) {
      this.logger.error({ error, id }, 'error at retrieving Region');
    }
  }
}
