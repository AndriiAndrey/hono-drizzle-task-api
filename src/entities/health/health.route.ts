import { createRoute } from '@hono/zod-openapi'

import { createRouter } from '@/lib/bootstrap-app'

import { HealthCheckResponseSchema } from './health.schema'

const healthCheckRoute = createRouter()

healthCheckRoute.openapi(createRoute({
  method: 'get',
  path: '/health',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: HealthCheckResponseSchema,
        },
      },
      description: 'Health check',
    },
  },
}), (c) => {
  return c.json({ message: 'ok' })
})

export default healthCheckRoute
