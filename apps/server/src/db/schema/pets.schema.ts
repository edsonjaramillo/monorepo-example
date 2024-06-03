import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { createdAt, updatedAt, id } from './fields';
import { usersTable } from './users.schema';

export const petsTable = pgTable('pets', {
  id,
  ownerId: varchar('owner_id', { length: 255 }),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt,
  updatedAt,
});

export const postsRelations = relations(petsTable, ({ one }) => ({
  owner: one(usersTable, { fields: [petsTable.ownerId], references: [usersTable.id] }),
}));
