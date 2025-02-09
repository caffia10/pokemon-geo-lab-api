import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from './db.schema';

export type DataBase = NodePgDatabase<typeof schema>;

export const DataBase = Symbol('DataBase');
