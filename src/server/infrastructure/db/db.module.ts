import { Global, Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { schema } from './db.schema';
import { DataBase } from './db.type';

function openConnection(): DataBase {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
  });
  return drizzle({ client: pool, schema: schema });
}

const type = {
  provide: DataBase,
  useValue: openConnection(),
};

@Global()
@Module({
  providers: [type],
  exports: [type],
})
export class DBModule {}
