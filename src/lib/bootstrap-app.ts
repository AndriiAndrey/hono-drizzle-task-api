import { serveStatic } from '@hono/node-server/serve-static'
import { OpenAPIHono } from '@hono/zod-openapi'
import { requestId } from 'hono/request-id'

import type { AppBindings } from '@/types'

import { logger } from '@/middlewares/pino-logger'

export function createRouter() {
  return new OpenAPIHono<AppBindings>({ strict: false, defaultHook: (result, c) => {
    if (!result.success) {
      return c.json({
        success: result.success,
        error: result.error,
      }, 422)
    }
  } })
}

export function bootstrapApp() {
  const app = createRouter()

  app.use(requestId())
  app.use(logger())

  app.use('/favicon.ico', serveStatic({ path: './static/favicon.ico' }))
  app.use('/static/*', serveStatic({ root: './' }))

  app.onError((err, c) => {
    console.error(`${err}`)
    return c.json({ message: `${err.message}`, stack: err.stack }, 500)
  })

  app.notFound((c) => {
    return c.json({ message: `${c.req.path} - Not Found` }, 404)
  })

  return app
}
