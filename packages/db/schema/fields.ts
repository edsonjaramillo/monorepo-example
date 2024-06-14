import { text, timestamp } from 'drizzle-orm/pg-core';
import { uuidv7 } from 'uuidv7';

export const id = text('id').notNull().primaryKey().$defaultFn(uuidv7);

export const createdAt = timestamp('created_at').notNull().defaultNow();
export const updatedAt = timestamp('updated_at')
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());
