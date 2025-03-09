import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  Building,
  BuildingRepository,
  buildingTypeEnum,
} from '../domain/building.types';
import { DataBase } from 'src/server/infrastructure/db/db.type';
import pino from 'pino';
import { buildingTable } from './building.schema';
import { eq, InferSelectModel } from 'drizzle-orm';

type BuildingSqlDto = InferSelectModel<typeof buildingTable>;

@Injectable()
export class BuildingPostgresqlRepository implements BuildingRepository {
  constructor(
    @Inject(DataBase) private db: DataBase,
    @Inject('LOGGER') private readonly logger: pino.Logger,
  ) {}
  async create(building: Building): Promise<void> {
    try {
      await this.db.insert(buildingTable).values(building);
      this.logger.info(building, 'building created');
    } catch (error) {
      this.logger.error(
        {
          name: building.name,
          error: error.message,
          error_stack: error.stack,
        },
        'error at creating building',
      );
      throw error;
    }
  }
  async getById(id: string): Promise<Building> {
    let buildingDto: BuildingSqlDto;
    try {
      const result = await this.db
        .select()
        .from(buildingTable)
        .where(eq(buildingTable.id, id));
      buildingDto = result[0];
    } catch (error) {
      this.logger.error(
        {
          id: id,
          error: error.message,
          error_stack: error.stack,
        },
        'unexpected error at retrieving building',
      );
      throw error;
    }

    if (!buildingDto) {
      this.logger.warn(
        {
          id,
        },
        'building not found with',
      );
      throw new NotFoundException('Building not found');
    }

    return BuildingPostgresqlRepository.convertDtoToBasicModel(buildingDto[0]);
  }

  private static convertDtoToBasicModel(rawDto: BuildingSqlDto): Building {
    return {
      ...rawDto,
      type: buildingTypeEnum[rawDto.type],
    };
  }
}
