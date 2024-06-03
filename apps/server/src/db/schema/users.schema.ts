import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { createdAt, id, updatedAt } from './fields';
import { petsTable } from './pets.schema';

export const usersTable = pgTable('users', {
  id,
  name: varchar('name', { length: 255 }).notNull(),
  createdAt,
  updatedAt,
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  pets: many(petsTable),
}));
