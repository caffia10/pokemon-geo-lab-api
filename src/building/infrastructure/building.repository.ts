import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Building, BuildingRepository } from '../domain/building.types';
import { DataBase } from 'src/server/infrastructure/db/db.type';
import pino from 'pino';
import { buildingTable } from './building.schema';
import { eq } from 'drizzle-orm';

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
          error: error,
        },
        'error at creating building',
      );
      throw error;
    }
  }
  async getById(id: string): Promise<Building> {
    let building: Building;
    try {
      building = await this.db
        .select()
        .from(buildingTable)
        .where(eq(buildingTable.id, id))[0];
    } catch (error) {
      this.logger.error(
        {
          id: id,
          error: error,
        },
        'unexpected error at retrieving building',
      );
      throw error;
    }

    if (!building) {
      this.logger.warn(
        {
          id,
        },
        'building not found with',
      );
      throw new NotFoundException('Building not found');
    }

    return building;
  }
}
