import { eq, sql } from 'drizzle-orm';

import { db } from './client';
import { DEFAULT_USERS_COLUMNS } from './columns/users.columns';
import { usersTable } from './schema';
import type { UserCreate } from './types/users.types';

export class UsersQueries {
  static async getUsers() {
    return await db.query.usersTable.findMany({ columns: DEFAULT_USERS_COLUMNS });
  }

  static async getUserById(id: string) {
    const query = db.query.usersTable
      .findFirst({
        where: eq(usersTable.id, sql.placeholder('id')),
        columns: DEFAULT_USERS_COLUMNS,
      })
      .prepare('getUserById');

    return query.execute({ id });
  }

  static async createUser(user: UserCreate) {
    const query = db
      .insert(usersTable)
      .values({
        name: sql.placeholder('name'),
      })
      .prepare('createUser');

    return query.execute({ name: user.name });
  }
}
