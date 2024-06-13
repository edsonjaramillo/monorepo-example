import { eq, sql } from 'drizzle-orm';

import { db } from '../client';
import { PETS_COLUMNS } from '../columns/pets.columns';
import { USERS_COLUMNS } from '../columns/users.columns';
import { usersTable } from '../schema';
import type { UserCreate, UserUpdate } from '../types/users.types';

export class UsersQueries {
  static async getUsers() {
    return await db.query.usersTable.findMany({ columns: USERS_COLUMNS });
  }

  static async getUserById(id: string) {
    const query = db.query.usersTable
      .findFirst({
        where: eq(usersTable.id, sql.placeholder('id')),
        columns: USERS_COLUMNS,
      })
      .prepare('getUserById');

    return await query.execute({ id });
  }

  static async createUser(user: UserCreate) {
    const query = db
      .insert(usersTable)
      .values({ name: sql.placeholder('name') })
      .prepare('createUser');

    return await query.execute({ name: user.name });
  }

  static async getUserWithPets(id: string) {
    const query = db.query.usersTable
      .findFirst({
        where: eq(usersTable.id, sql.placeholder('id')),
        columns: USERS_COLUMNS,
        with: { pets: { columns: PETS_COLUMNS } },
      })
      .prepare('getUserWithPets');

    return await query.execute({ id });
  }

  static async updateUser(id: string, user: UserUpdate) {
    await db.update(usersTable).set(user).where(eq(usersTable.id, id));
  }
}
