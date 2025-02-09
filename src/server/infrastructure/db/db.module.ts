import { Global, Inject, Module } from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { schema } from './db.schema';
import { DataBase } from './db.type';
import { ConfigService } from '@nestjs/config';

function openConnection(configService: ConfigService): DataBase {
  const pool = new Pool({
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    user: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
  });
  return drizzle({ client: pool, schema: schema }) as NodePgDatabase<
    typeof schema
  >;
}

const type = {
  provide: DataBase,
  inject: [ConfigService],
  useFactory: openConnection,
};

@Global()
@Module({
  providers: [type],
  exports: [type],
})
export class DBModule {}
