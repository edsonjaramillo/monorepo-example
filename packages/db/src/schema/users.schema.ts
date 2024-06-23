import { relations } from 'drizzle-orm';
import { pgTable, uniqueIndex, varchar } from 'drizzle-orm/pg-core';

import { createdAt, id, updatedAt } from './fields';
import { petsTable } from './pets.schema';
import { sessionsTable } from './sessions.schema';

export const usersTable = pgTable(
  'users',
  {
    id,
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),
    createdAt,
    updatedAt,
  },
  (table) => ({ emailIdx: uniqueIndex('email_idx').on(table.email) }),
);

export const usersRelations = relations(usersTable, ({ many }) => ({
  sessions: many(sessionsTable),
  pets: many(petsTable),
}));
