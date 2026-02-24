import { Scalar } from '@scalar/hono-api-reference'

import type { AppType } from '@/types'

import packageJSON from '../../package.json'

export function configureOpenApi(app: AppType) {
  // The OpenAPI documentation will be available at /doc
  app.doc('/openapi', {
    openapi: '3.0.0',
    info: {
      version: packageJSON.version,
      title: 'Hono Drizzle Task API',
    },
  })

  app.get('/scalar', Scalar({
    url: '/openapi',
    theme: 'bluePlanet',
    defaultHttpClient: { clientKey: 'fetch', targetKey: 'node' },
    layout: 'classic',
  }))
}
