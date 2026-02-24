import { pinoLogger } from 'hono-pino'
import pino from 'pino'
import pretty from 'pino-pretty'

import env from '../env.js'

const isProduction = env.NODE_ENV === 'production'

export function logger() {
  return pinoLogger({
    pino: pino({
      level: env.LOG_LEVEL,
    }, isProduction ? undefined : pretty()),
    http: {
      referRequestIdKey: 'requestId',
    },
  })
}
