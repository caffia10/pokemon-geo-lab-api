import { Module } from '@nestjs/common';
import { DefaultCreateRegionUseCase } from './application/create.region.usecase';
import { DefaultGetByIdRegionUseCase } from './application/getById.region.usecase';
import {
  CreateRegionUseCase,
  GetByIdRegionUseCase,
  GetRegionListUseCase,
} from './application/usecases.interfaces';
import { RegionController } from './infrastructure/region.controller';
import { DefaultGetProfessorListUseCase } from './application/getList.region.usecase';
import { RegionPostgresqlRepository } from './infrastructure/region.repository';
import { RegionRepository } from './domain/region.types';

@Module({
  controllers: [RegionController],
  providers: [
    {
      provide: CreateRegionUseCase,
      useClass: DefaultCreateRegionUseCase,
    },
    {
      provide: GetByIdRegionUseCase,
      useClass: DefaultGetByIdRegionUseCase,
    },
    {
      provide: GetRegionListUseCase,
      useClass: DefaultGetProfessorListUseCase,
    },
    {
      provide: RegionRepository,
      useClass: RegionPostgresqlRepository,
    },
  ],
  exports: [
    {
      provide: CreateRegionUseCase,
      useClass: DefaultCreateRegionUseCase,
    },
    {
      provide: GetByIdRegionUseCase,
      useClass: DefaultGetByIdRegionUseCase,
    },
    {
      provide: GetRegionListUseCase,
      useClass: DefaultGetProfessorListUseCase,
    },
  ],
})
export class RegionModule {}
