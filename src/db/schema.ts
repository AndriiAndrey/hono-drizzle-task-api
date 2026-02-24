import { boolean, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  done: boolean('done').notNull().default(false),
  createdAt: timestamp('created_at', {
    mode: 'date',
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', {
    mode: 'date',
    withTimezone: true,
  })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const selectTasksSchema = createSelectSchema(tasks)

export const insertTasksSchema = createInsertSchema(tasks, {
  name: schema =>
    schema
      .min(1)
      .max(255),
})
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .required({
    done: true,
  })

export const patchTasksSchema = insertTasksSchema
  .partial()
  .refine(
    data => Object.keys(data).length > 0,
    'At least one field must be provided.',
  )
