import { Module } from '@nestjs/common';
import { TownController } from './infrastructure/town.controller';
import { DefaultCreateTownUseCase } from './application/create.town.usecase';
import {
  CreateTownUseCase,
  GetByIdTownUseCase,
} from './application/usecases.interfaces';
import { DefaultGetByIdTownUseCase } from './application/getById.town.usecase';
import { TownRepository } from './domain/town.types';
import { TownPostgresqlRepository } from './infrastructure/town.repository';

@Module({
  controllers: [TownController],
  providers: [
    {
      provide: CreateTownUseCase,
      useClass: DefaultCreateTownUseCase,
    },
    {
      provide: GetByIdTownUseCase,
      useClass: DefaultGetByIdTownUseCase,
    },
    {
      provide: TownRepository,
      useClass: TownPostgresqlRepository,
    },
  ],
  exports: [
    {
      provide: CreateTownUseCase,
      useClass: DefaultCreateTownUseCase,
    },
    {
      provide: GetByIdTownUseCase,
      useClass: DefaultGetByIdTownUseCase,
    },
  ],
})
export class TownModule {}
