import { count, eq } from 'drizzle-orm';

import { Redis } from 'cache';

import type { Database } from '../client';
import { USERS_COLUMNS, USERS_CREDENTIALS_COLUMNS } from '../columns/users.columns';
import { UsersKeys } from '../keys';
import { usersTable } from '../schema';
import type { RowCount } from '../types/shared.types';
import type {
  User,
  UserCreate,
  UserCredentials,
  UserSelfUpdate,
  UserUpdate,
} from '../types/users.types';

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

    const user = await this.db.query.usersTable.findFirst({
      where: eq(usersTable.id, id),
      columns: USERS_COLUMNS,
    });

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

    const user = await this.db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
      columns: USERS_CREDENTIALS_COLUMNS,
    });

    if (!user) {
      return undefined;
    }

    await this.cache.set(cachedCredentialsKey, user);

    return user as UserCredentials;
  }

  async createUser(user: UserCreate) {
    await this.cache.cleanPatterns(UsersKeys.onCreate());
    await this.db.insert(usersTable).values(user);
  }

  async updateUser(id: string, email: string, user: UserUpdate) {
    await this.cache.cleanPatterns(UsersKeys.onUpdate(id, email));
    await this.db.update(usersTable).set(user).where(eq(usersTable.id, id));
  }

  async selfUpdateUser(id: string, user: UserSelfUpdate) {
    await this.db.update(usersTable).set(user).where(eq(usersTable.id, id));
  }
}
