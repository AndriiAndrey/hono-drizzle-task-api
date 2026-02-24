import { testClient } from 'hono/testing'
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import { afterAll, beforeAll, describe, expect, expectTypeOf, it } from 'vitest'

import env from '@/env'
import { bootstrapApp } from '@/lib/bootstrap-app'

import tasksRouter from './tasks.router'

if (env.NODE_ENV !== 'test') {
  throw new Error('NODE_ENV must be \'test\'')
}

const client = testClient(bootstrapApp().route('/', tasksRouter))

let id = '7e62425e-8899-44d8-9839-a0e52030aa81'
const name = 'Learn drizzle'

describe('tasks routes', () => {
  beforeAll(async () => {
    execSync('pnpm drizzle-kit push')
  })

  afterAll(async () => {
    fs.rmSync('test.db', { force: true })
  })

  it('post /tasks validates the body when creating', async () => {
    const response = await client.tasks.$post({
      json: {
        done: false,
        name: '',
      },
    })

    expect(response.status).toBe(422)
    if (response.status === 422) {
      const json = await response.json()
      expect(json.error.name).toBe('ZodError')
    }
  })

  it('post /tasks creates a task', async () => {
    const response = await client.tasks.$post({
      json: {
        name,
        done: false,
      },
    })

    expect(response.status).toBe(200)
    if (response.status === 200) {
      const json = await response.json()
      id = json.id
      expect(json.name).toBe(name)
      expect(json.done).toBe(false)
    }
  })

  it('get /tasks lists all tasks', async () => {
    const response = await client.tasks.$get()
    expect(response.status).toBe(200)
    if (response.status === 200) {
      const json = await response.json()
      expectTypeOf(json).toBeArray()
    }
  })

  it('get /tasks/{id} validates the id param', async () => {
    const response = await client.tasks[':id'].$get({
      param: {
        id: 'wat',
      },
    })
    expect(response.status).toBe(422)
    if (response.status === 422) {
      const json = await response.json()
      expect(json.error.name).toBe('ZodError')
    }
  })

  it('get /tasks/{id} returns 404 when Not Found', async () => {
    const response = await client.tasks[':id'].$get({
      param: {
        id: '7e62425e-8899-44d8-9839-a0e52030aa00',
      },
    })
    expect(response.status).toBe(404)
    if (response.status === 404) {
      const json = await response.json()
      expect(json.error.message).toBe('Not Found')
    }
  })

  it('get /tasks/{id} gets a single task', async () => {
    const response = await client.tasks[':id'].$get({
      param: {
        id,
      },
    })
    expect(response.status).toBe(200)
    if (response.status === 200) {
      const json = await response.json()
      expect(json.name).toBe(name)
      expect(json.done).toBe(false)
    }
  })

  it('patch /tasks/{id} validates the body when updating', async () => {
    const response = await client.tasks[':id'].$patch({
      param: {
        id,
      },
      json: {
        name: '',
      },
    })
    expect(response.status).toBe(422)
    if (response.status === 422) {
      const json = await response.json()
      expect(json.error.name).toBe('ZodError')
    }
  })

  it('patch /tasks/{id} validates the id param', async () => {
    const response = await client.tasks[':id'].$patch({
      param: {
        id: 'wat',
      },
      json: {},
    })
    expect(response.status).toBe(422)
    if (response.status === 422) {
      const json = await response.json()
      expect(json.error.name).toBe('ZodError')
    }
  })

  it('patch /tasks/{id} validates empty body', async () => {
    const response = await client.tasks[':id'].$patch({
      param: {
        id,
      },
      json: {},
    })
    expect(response.status).toBe(422)
    if (response.status === 422) {
      const json = await response.json()
      expect(json.error.name).toBe('ZodError')
    }
  })

  it('patch /tasks/{id} updates a single property of a task', async () => {
    const response = await client.tasks[':id'].$patch({
      param: {
        id,
      },
      json: {
        done: true,
      },
    })
    expect(response.status).toBe(200)
    if (response.status === 200) {
      const json = await response.json()
      expect(json.done).toBe(true)
    }
  })

  it('delete /tasks/{id} validates the id when deleting', async () => {
    const response = await client.tasks[':id'].$delete({
      param: {
        id: 'wat',
      },
    })
    expect(response.status).toBe(422)
    if (response.status === 422) {
      const json = await response.json()
      expect(json.error.name).toBe('ZodError')
    }
  })

  it('delete /tasks/{id} removes a task', async () => {
    const response = await client.tasks[':id'].$delete({
      param: {
        id,
      },
    })
    expect(response.status).toBe(204)
  })
})
