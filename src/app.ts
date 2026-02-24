import healthCheckRoute from '@/entities/health/health.route'
import tasksRouter from '@/entities/tasks/tasks.router'
import { bootstrapApp } from '@/lib/bootstrap-app'
import { configureOpenApi } from '@/lib/open-api'

const app = bootstrapApp()
  .route('/', healthCheckRoute)
  .route('/', tasksRouter)

configureOpenApi(app)

export default app

export type AppType = typeof app
