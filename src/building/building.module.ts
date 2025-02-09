import { Module } from '@nestjs/common';
import { BuildingController } from './infrastructure/building.controller';
import { DefaultCreateBuildingUseCase } from './application/create.building.usecase';
import {
  CreateBuildingUseCase,
  GetByIdBuildingUseCase,
} from './application/usecases.interfaces';
import { DefaultGetByIdBuildingUseCase } from './application/getById.building.usecase';
import { BuildingPostgresqlRepository } from './infrastructure/building.repository';
import { BuildingRepository } from './domain/building.types';

@Module({
  controllers: [BuildingController],
  providers: [
    {
      provide: CreateBuildingUseCase,
      useClass: DefaultCreateBuildingUseCase,
    },
    {
      provide: GetByIdBuildingUseCase,
      useClass: DefaultGetByIdBuildingUseCase,
    },
    {
      provide: BuildingRepository,
      useClass: BuildingPostgresqlRepository,
    },
  ],
  exports: [
    {
      provide: CreateBuildingUseCase,
      useClass: DefaultCreateBuildingUseCase,
    },
    {
      provide: GetByIdBuildingUseCase,
      useClass: DefaultGetByIdBuildingUseCase,
    },
  ],
})
export class BuildingModule {}
