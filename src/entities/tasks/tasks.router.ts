import { createRouter } from '@/lib/bootstrap-app'

import * as handlers from './tasks.handlers'
import * as routes from './tasks.routes'

const tasksRouter = createRouter()
  .openapi(routes.getList, handlers.getList)
  .openapi(routes.create, handlers.create)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.patch, handlers.patch)
  .openapi(routes.remove, handlers.remove)

export default tasksRouter
