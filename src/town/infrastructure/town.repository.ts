import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Town, TownRepository } from '../domain/town.types';
import { DataBase } from 'src/server/infrastructure/db/db.type';
import pino from 'pino';
import { townTable } from './town.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class TownPostgresqlRepository implements TownRepository {
  constructor(
    @Inject(DataBase) private db: DataBase,
    @Inject('LOGGER') private readonly logger: pino.Logger,
  ) {}
  async create(town: Town): Promise<void> {
    try {
      await this.db.insert(townTable).values(town);
      this.logger.info(town, 'town created');
    } catch (error) {
      this.logger.error(
        {
          name: town.name,
          error: error,
        },
        'error at creating town',
      );
      throw error;
    }
  }
  async getById(id: string): Promise<Town> {
    let town: Town;
    try {
      town = await this.db
        .select()
        .from(townTable)
        .where(eq(townTable.id, id))[0];
    } catch (error) {
      this.logger.error(
        {
          id: id,
          error: error,
        },
        'unexpected error at retrieving town',
      );
      throw error;
    }

    if (!town) {
      this.logger.warn(
        {
          id,
        },
        'town not found with',
      );
      throw new NotFoundException('Town not found');
    }

    return town;
  }
}
