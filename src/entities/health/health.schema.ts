import { z } from '@hono/zod-openapi'

export const HealthCheckResponseSchema = z.object({
  message: z.string(),
})
