import { defineConfig } from 'drizzle-kit';
import { schema } from 'src/server/infrastructure/db/db.schema';

import * as dotenv from 'dotenv';

dotenv.config();

// TODO:
// - mejorar la forma de obtener los schemas desde un unico lugar, si es posible.
// - emprolijar connection
export default defineConfig({
  out: './drizzle',
  schema: [
    './src/town/infrastructure/town.schema.ts',
    './src/region/infrastructure/region.schema.ts',
    './src/building/infrastructure/building.schema.ts',
  ],
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL_MIGRATION!,
  },
});
