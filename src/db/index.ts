import { drizzle } from 'drizzle-orm/node-postgres'

import env from '@/env'

import * as schema from './schema'

const DATABASE_URL = `postgresql://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@localhost:5432/${env.POSTGRES_DB}`

export const db = drizzle({
  connection: DATABASE_URL,
  casing: 'snake_case',
  schema,
})
