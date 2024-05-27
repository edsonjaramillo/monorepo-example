import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { timestampFields, id } from './fields';

export const usersTable = pgTable('users', {
  ...id,
  name: varchar('name', { length: 255 }).notNull(),
  ...timestampFields,
});
