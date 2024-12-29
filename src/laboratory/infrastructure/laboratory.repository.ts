import { Inject, Injectable } from '@nestjs/common';
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
    await this.db.insert(laboratoryTable).values(laboratory);
  }
  async getById(id: string): Promise<Laboratory> {
    const laboratory = await this.db
      .select()
      .from(laboratoryTable)
      .where(eq(laboratoryTable.id, id))[0];

    if (!laboratory) {
      throw new Error('Laboratory not found');
    }

    return laboratory;
  }
}
