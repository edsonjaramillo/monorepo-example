import { eq, sql } from 'drizzle-orm';

import { db } from './client';
import { usersTable } from './schema';

class UsersQueries {
  async getUsers() {
    const query = db.query.usersTable.findMany().prepare('getUsers');

    return query.execute();
  }

  async getUserById(id: string) {
    const query = db.query.usersTable
      .findFirst({ where: eq(usersTable.id, sql.placeholder('id')) })
      .prepare('getUserById');

    return query.execute({ id });
  }

  async createUser(name: string) {
    const query = db
      .insert(usersTable)
      .values({ name: sql.placeholder('name') })
      .prepare('createUser');

    return query.execute({ name });
  }
}

export const userQueries = new UsersQueries();
