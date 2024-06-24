import { Redis } from 'cache';
import { eq, sql } from 'drizzle-orm';

import type { Database } from '../client';
import { PETS_COLUMNS } from '../columns/pets.columns';
import { USERS_COLUMNS, USERS_CREDENTIALS_COLUMNS } from '../columns/users.columns';
import { usersTable } from '../schema';
import type {
  User,
  UserCreate,
  UserCredentials,
  UserUpdate,
  UserWithPets,
} from '../types/users.types';

export class UsersQueries {
  private readonly db: Database;
  private readonly cache: Redis;

  constructor(database: Database, redis: Redis) {
    this.db = database;
    this.cache = redis;
  }

  async getUsers(): Promise<User[]> {
    return this.db.query.usersTable.findMany({ columns: USERS_COLUMNS });
  }

  async getUserById(id: string): Promise<User | undefined> {
    const cachedUser = await this.cache.get<User>(`user:${id}`);
    if (cachedUser) {
      return cachedUser;
    }

    const query = this.db.query.usersTable
      .findFirst({ where: eq(usersTable.id, sql.placeholder('id')), columns: USERS_COLUMNS })
      .prepare('getUserById');

    const user = await query.execute({ id });
    if (user) {
      await this.cache.set(`user:${id}`, user);
    }

    return user;
  }

  async getUserCredentials(email: string): Promise<UserCredentials | undefined> {
    const cachedCredentials = await this.cache.get<UserCredentials>(`user:${email}:credentials`);
    if (cachedCredentials) {
      return cachedCredentials;
    }

    const query = this.db.query.usersTable
      .findFirst({
        where: eq(usersTable.email, sql.placeholder('email')),
        columns: USERS_CREDENTIALS_COLUMNS,
      })
      .prepare('getUserCredentials');

    const user = await query.execute({ email });
    if (!user) {
      return undefined;
    }

    return user as UserCredentials;
  }

  async createUser(user: UserCreate) {
    const query = this.db
      .insert(usersTable)
      .values({
        name: sql.placeholder('name'),
        email: sql.placeholder('email'),
        password: sql.placeholder('password'),
      })
      .prepare('createUser');

    await query.execute(user);
  }

  async getUserWithPets(id: string): Promise<UserWithPets | undefined> {
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
