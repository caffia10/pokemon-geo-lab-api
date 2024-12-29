import { drizzle } from 'drizzle-orm/node-postgres';

export type DataBase = ReturnType<typeof drizzle>;

export const DataBase = Symbol('DataBase');
