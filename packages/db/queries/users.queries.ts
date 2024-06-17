import { eq, sql } from 'drizzle-orm';

import type { DB } from '../client';
import { PETS_COLUMNS } from '../columns/pets.columns';
import { USERS_COLUMNS } from '../columns/users.columns';
import { usersTable } from '../schema';
import type { UserCreate, UserUpdate } from '../types/users.types';

export class UsersQueries {
  private db: DB;
  constructor(db: DB) {
    this.db = db;
  }

  async getUsers() {
    return await this.db.query.usersTable.findMany({ columns: USERS_COLUMNS });
  }

  async getUserById(id: string) {
    const query = this.db.query.usersTable
      .findFirst({
        where: eq(usersTable.id, sql.placeholder('id')),
        columns: USERS_COLUMNS,
      })
      .prepare('getUserById');

    return await query.execute({ id });
  }

  async createUser(user: UserCreate) {
    const query = this.db
      .insert(usersTable)
      .values({ name: sql.placeholder('name') })
      .prepare('createUser');

    return await query.execute({ name: user.name });
  }

  async getUserWithPets(id: string) {
    const query = this.db.query.usersTable
      .findFirst({
        where: eq(usersTable.id, sql.placeholder('id')),
        columns: USERS_COLUMNS,
        with: { pets: { columns: PETS_COLUMNS } },
      })
      .prepare('getUserWithPets');

    return await query.execute({ id });
  }

  async updateUser(id: string, user: UserUpdate) {
    await this.db.update(usersTable).set(user).where(eq(usersTable.id, id));
  }
}
