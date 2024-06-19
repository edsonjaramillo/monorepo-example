import { eq, sql } from 'drizzle-orm';

import type { Database } from '../client';
import { PETS_COLUMNS } from '../columns/pets.columns';
import { USERS_COLUMNS } from '../columns/users.columns';
import { usersTable } from '../schema';
import type { UserCreate, UserUpdate } from '../types/users.types';

export class UsersQueries {
  private readonly db: Database;
  constructor(database: Database) {
    this.db = database;
  }

  async getUsers() {
    return this.db.query.usersTable.findMany({ columns: USERS_COLUMNS });
  }

  async getUserById(id: string) {
    const query = this.db.query.usersTable
      .findFirst({
        where: eq(usersTable.id, sql.placeholder('id')),
        columns: USERS_COLUMNS,
      })
      .prepare('getUserById');

    return query.execute({ id });
  }

  async createUser(user: UserCreate) {
    const query = this.db
      .insert(usersTable)
      .values({ name: sql.placeholder('name') })
      .prepare('createUser');

    return query.execute({ name: user.name });
  }

  async getUserWithPets(id: string) {
    const query = this.db.query.usersTable
      .findFirst({
        where: eq(usersTable.id, sql.placeholder('id')),
        columns: USERS_COLUMNS,
        with: { pets: { columns: PETS_COLUMNS } },
      })
      .prepare('getUserWithPets');

    return query.execute({ id });
  }

  async updateUser(id: string, user: UserUpdate) {
    await this.db.update(usersTable).set(user).where(eq(usersTable.id, id));
  }
}
