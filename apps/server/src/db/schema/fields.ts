import { text, timestamp } from 'drizzle-orm/pg-core';
import { uuidv7 } from 'uuidv7';

export const id = {
  id: text('id').notNull().primaryKey().$defaultFn(uuidv7),
} as const;

export const timestampFields = {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
} as const;
