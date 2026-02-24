import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import z from 'zod'

expand(config())

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3000'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
})

// eslint-disable-next-line node/no-process-env
const env = EnvSchema.parse(process.env)

export type EnvType = z.infer<typeof EnvSchema>

export default env
