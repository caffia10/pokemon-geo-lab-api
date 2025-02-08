import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Laboratory } from '../domain/laboratory.model';
import { LaboratoryRepository } from '../domain/laboratory.repository';
import { DataBase } from 'src/server/infrastructure/db/db.type';
import pino from 'pino';
import { laboratoryTable } from './laboratory.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class LaboratoryPostgresqlRepository implements LaboratoryRepository {
  constructor(
    @Inject(DataBase) private db: DataBase,
    @Inject('LOGGER') private readonly logger: pino.Logger,
  ) {}
  async create(laboratory: Laboratory): Promise<void> {
    try {
      await this.db.insert(laboratoryTable).values(laboratory);
      this.logger.info(
        {
          name: laboratory.name,
          region: laboratory.region,
          town: laboratory.town,
        },
        'laboratory created',
      );
    } catch (error) {
      this.logger.error(
        {
          name: laboratory.name,
          error: error,
        },
        'error at creating laboratory',
      );
      throw error;
    }
  }
  async getById(id: string): Promise<Laboratory> {
    let laboratory: Laboratory;
    try {
      laboratory = await this.db
        .select()
        .from(laboratoryTable)
        .where(eq(laboratoryTable.id, id))[0];
    } catch (error) {
      this.logger.error(
        {
          id: id,
          error: error,
        },
        'unexpected error at retrieving laboratory',
      );
      throw error;
    }

    if (!laboratory) {
      this.logger.warn(
        {
          id,
        },
        'laboratory not found with',
      );
      throw new NotFoundException('Laboratory not found');
    }

    return laboratory;
  }
}
