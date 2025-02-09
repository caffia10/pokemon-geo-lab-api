import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Region, RegionRepository } from '../domain/region.types';
import { DataBase } from 'src/server/infrastructure/db/db.type';
import pino from 'pino';
import { regionTable } from './region.schema';
import { eq } from 'drizzle-orm';

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
          erro_stack: error.stack,
        },
        '[RegionPostgresqlRepository] error at creating region',
      );
      throw error;
    }
  }
  async getById(id: string): Promise<Region> {
    let region: Region;
    try {
      region = await this.db
        .select()
        .from(regionTable)
        .where(eq(regionTable.id, id))[0];
    } catch (error) {
      this.logger.error(
        {
          id: id,
          error: error,
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
      const regions = this.db.select().from(regionTable);
      this.logger.info('regions retrieved');
      return regions;
    } catch (error) {
      this.logger.error(
        {
          error,
        },
        'unexpected error at retrieving regions',
      );
      throw error;
    }
  }
}
