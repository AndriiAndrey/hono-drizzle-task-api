import { createRoute, z } from '@hono/zod-openapi'

import { insertTasksSchema, patchTasksSchema, selectTasksSchema } from '@/db/schema'
import { ErrorSchema, IdParamsSchema } from '@/lib/constants'

const tags = ['Tasks']

export const getList = createRoute({
  method: 'get',
  path: '/tasks',
  tags,
  description: 'Tasks list',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(selectTasksSchema),
        },
      },
      description: 'Success tasks list response',
    },
  },
})

export const getOne = createRoute({
  method: 'get',
  path: '/tasks/{id}',
  tags,
  request: {
    params: IdParamsSchema,
  },
  description: 'Get task by id',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: selectTasksSchema,
        },
      },
      description: 'Success task get by id response',
    },
    422: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Validation error response',
    },
    404: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Not found error response',
    },
  },
})

export const create = createRoute({
  method: 'post',
  path: '/tasks',
  tags,
  description: 'Create a task',
  request: {
    body: {
      content: {
        'application/json': {
          schema: insertTasksSchema,
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: selectTasksSchema,
        },
      },
      description: 'Success task created response',
    },
    422: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Validation error response',
    },
  },
})

export const patch = createRoute({
  method: 'patch',
  path: '/tasks/{id}',
  tags,
  request: {
    params: IdParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: patchTasksSchema,
        },
      },
      required: true,
      description: 'The task update request',
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: selectTasksSchema,
        },
      },
      description: 'The task update',
    },
    422: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Validation error',
    },
    404: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Not found error response',
    },
  },
})

export const remove = createRoute({
  method: 'delete',
  path: '/tasks/{id}',
  tags,
  request: {
    params: IdParamsSchema,
  },
  responses: {
    204: {
      description: 'Task deleted',
    },
    422: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Validation error',
    },
    404: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Not found error response',
    },
  },
})

export type GetListRouteType = typeof getList
export type GetOneRouteType = typeof getOne
export type CreateRouteType = typeof create
export type PatchRouteType = typeof patch
export type DeleteRouteType = typeof remove
