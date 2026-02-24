import { z } from '@hono/zod-openapi'

export const ErrorSchema = z.object({
  success: z.boolean().default(false).openapi({ example: false }),
  error: z.object({
    name: z.string().openapi({
      example: 'ZodError',
    }),
    message: z.string().openapi({
      example: 'Bad Request',
    }),

  }),
})

export const IdParamsSchema = z.object({
  id: z
    .uuid()
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      example: '926bc153-4c45-4a8f-afc2-2e62970e6714',
    }),
})
