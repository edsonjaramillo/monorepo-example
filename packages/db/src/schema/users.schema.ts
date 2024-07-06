import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, uniqueIndex, varchar } from 'drizzle-orm/pg-core';

import { createdAt, id, updatedAt } from './fields';
import { sessionsTable } from './sessions.schema';

export const roles = ['admin', 'employee', 'user'] as const;
export type UserRoles = (typeof roles)[number];
export const rolesEnum = pgEnum('roles', roles);

export const usersTable = pgTable(
  'users',
  {
    id,
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),
    role: rolesEnum('role').default('user').notNull(),
    image: varchar('image', { length: 255 }),
    createdAt,
    updatedAt,
  },
  (table) => ({ emailIdx: uniqueIndex('email_idx').on(table.email) }),
);

export const usersRelations = relations(usersTable, ({ many }) => ({
  sessions: many(sessionsTable),
}));
