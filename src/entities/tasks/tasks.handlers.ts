import type { RouteHandler } from '@hono/zod-openapi'

import { eq } from 'drizzle-orm'

import type { AppBindings } from '@/types'

import { db } from '@/db'
import { tasks } from '@/db/schema'

import type { CreateRouteType, DeleteRouteType, GetListRouteType, GetOneRouteType, PatchRouteType } from './tasks.routes'

export const getList: RouteHandler<GetListRouteType, AppBindings> = async (c) => {
  const tasks = await db.query.tasks.findMany()

  return c.json(tasks)
}

export const getOne: RouteHandler<GetOneRouteType, AppBindings> = async (c) => {
  const { id } = c.req.valid('param')
  const task = await db.query.tasks.findFirst({
    where: (fields, operators) => operators.eq(fields.id, id),
  })

  if (!task) {
    return c.json({ error: { message: 'Not Found', name: 'NOT_FOUND_ERROR' }, success: false }, 404)
  }

  return c.json(task, 200)
}

export const create: RouteHandler<CreateRouteType, AppBindings> = async (c) => {
  const taskInput = c.req.valid('json')

  const [inserted] = await db.insert(tasks).values(taskInput).returning()

  return c.json(inserted, 200)
}

export const patch: RouteHandler<PatchRouteType, AppBindings> = async (c) => {
  const { id } = c.req.valid('param')
  const updatesInput = c.req.valid('json')

  const [task] = await db.update(tasks).set(updatesInput).where(eq(tasks.id, id)).returning()

  if (!task) {
    return c.json({ error: { message: 'Not Found', name: 'NOT_FOUND_ERROR' }, success: false }, 404)
  }

  return c.json(task, 200)
}

export const remove: RouteHandler<DeleteRouteType, AppBindings> = async (c) => {
  const { id } = c.req.valid('param')

  const result = await db.delete(tasks).where(eq(tasks.id, id))

  if (!result.rowCount) {
    return c.json({ error: { message: 'Not Found', name: 'NOT_FOUND_ERROR' }, success: false }, 404)
  }

  return c.body(null, 204)
}
