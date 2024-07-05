import { Redis } from 'cache';
import { count, eq, sql } from 'drizzle-orm';

import type { Database } from '../client';
import { USERS_COLUMNS, USERS_CREDENTIALS_COLUMNS } from '../columns/users.columns';
import { UsersKeys } from '../keys';
import { usersTable } from '../schema';
import type { RowCount } from '../types/shared.types';
import type { User, UserCreate, UserCredentials, UserUpdate } from '../types/users.types';

export class UsersQueries {
  private readonly db: Database;
  private readonly cache: Redis;

  constructor(database: Database, redis: Redis) {
    this.db = database;
    this.cache = redis;
  }

  async getUsers(limit: number, offset: number): Promise<User[]> {
    const cachedUsersKey = UsersKeys.bulk(limit, offset);
    const cachedUsers = await this.cache.get<User[]>(cachedUsersKey);
    if (cachedUsers) {
      return cachedUsers;
    }

    const users = await this.db.query.usersTable.findMany({
      limit,
      offset,
      columns: USERS_COLUMNS,
    });

    await this.cache.set(cachedUsersKey, users);

    return users;
  }

  async getUserCounts(): Promise<RowCount> {
    const key = UsersKeys.count();
    const cachedCountSeasonRecords = await this.cache.get<RowCount>(key);
    if (cachedCountSeasonRecords) {
      return cachedCountSeasonRecords;
    }

    const [{ amountOfRows }] = await this.db
      .select({ amountOfRows: count(usersTable.id) })
      .from(usersTable)
      .execute();

    await this.cache.set(key, { amountOfRows });

    return { amountOfRows };
  }

  async getUserById(id: string): Promise<User | undefined> {
    const cachedUserKey = UsersKeys.byId(id);
    const cachedUser = await this.cache.get<User>(cachedUserKey);
    if (cachedUser) {
      return cachedUser;
    }

    const query = this.db.query.usersTable
      .findFirst({ where: eq(usersTable.id, sql.placeholder('id')), columns: USERS_COLUMNS })
      .prepare('getUserById');

    const user = await query.execute({ id });
    if (user) {
      await this.cache.set(cachedUserKey, user);
    }

    return user;
  }

  async getUserCredentials(email: string): Promise<UserCredentials | undefined> {
    const cachedCredentialsKey = UsersKeys.credentials(email);
    const cachedCredentials = await this.cache.get<UserCredentials>(cachedCredentialsKey);
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

    await this.cache.set(cachedCredentialsKey, user);

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

  async updateUser(id: string, user: UserUpdate) {
    await this.db.update(usersTable).set(user).where(eq(usersTable.id, id));
  }
}
