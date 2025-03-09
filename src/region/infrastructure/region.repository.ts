import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  Region,
  RegionDetailed,
  RegionRepository,
} from '../domain/region.types';
import { DataBase } from 'src/server/infrastructure/db/db.type';
import pino from 'pino';
import { regionTable } from './region.schema';
import { eq } from 'drizzle-orm';
import { townTable } from 'src/town/infrastructure/town.schema';
import { buildingTable } from 'src/building/infrastructure/building.schema';
import { Building, buildingTypeEnum } from 'src/building/domain/building.types';
import { TownDetailed } from 'src/town/domain/town.types';

@Injectable()
export class RegionPostgresqlRepository implements RegionRepository {
  constructor(
    @Inject(DataBase) private db: DataBase,
    @Inject('LOGGER') private readonly logger: pino.Logger,
  ) {}
  async create(name: string): Promise<void> {
    try {
      await this.db.insert(regionTable).values({ name });
      this.logger.info({ name }, '[RegionPostgresqlRepository]region created');
    } catch (error) {
      this.logger.error(
        {
          name,
          error: error.message,
          error_stack: error.stack,
        },
        '[RegionPostgresqlRepository] error at creating region',
      );
      throw error;
    }
  }
  async getById(id: string): Promise<Region> {
    let region: Region;
    try {
      const result = await this.db
        .select()
        .from(regionTable)
        .where(eq(regionTable.id, id));
      region = result[0];
    } catch (error) {
      this.logger.error(
        {
          id: id,
          error: error.message,
          error_stack: error.stack,
        },
        'unexpected error at retrieving region',
      );
      throw error;
    }

    if (!region) {
      this.logger.warn(
        {
          id,
        },
        'region not found with',
      );
      throw new NotFoundException('region not found');
    }

    return region;
  }

  async getList(): Promise<Region[]> {
    try {
      const regions = await this.db.select().from(regionTable);
      this.logger.info('regions retrieved');
      return regions;
    } catch (error) {
      this.logger.error(
        {
          error: error.message,
          error_stack: error.stack,
        },
        'unexpected error at retrieving regions',
      );
      throw error;
    }
  }

  async retrieveFull(id: string): Promise<RegionDetailed> {
    try {
      const regionDto = await this.db.query.regionTable.findFirst({
        where: eq(regionTable.id, id),
        with: {
          towns: {
            with: {
              buildings: true,
            },
          },
        },
      });
      this.logger.info('regions retrieved');

      const region: RegionDetailed = {
        ...regionDto,
        towns: regionDto.towns.map((t) => ({
          ...t,
          buildings: t.buildings.map((b) => ({
            ...b,
            type: buildingTypeEnum[b.type],
          })),
        })),
      };

      return region;
    } catch (error) {
      this.logger.error(
        {
          error: error.message,
          error_stack: error.stack,
        },
        'unexpected error at retrieving regions',
      );
      throw error;
    }
  }
}
