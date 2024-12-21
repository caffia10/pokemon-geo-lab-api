import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { schema } from './schema';
import { Injectable } from '@nestjs/common';

type DB = ReturnType<typeof drizzle>;

@Injectable()
export class DBService {
  private db: DB;

  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL!,
    });
    this.db = drizzle({ client: pool, schema: schema });
  }

  getDB() {
    return this.db;
  }
}
