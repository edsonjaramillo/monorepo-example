import { count, eq } from 'drizzle-orm';

import type { CacheClient } from 'cache';

import { CORE_IMAGE_COLUMNS } from '../columns';
import { USERS_COLUMNS, USERS_CREDENTIALS_COLUMNS } from '../columns/users.columns';
import type { Database } from '../database.client';
import { UsersKeys } from '../keys';
import { usersTable } from '../schema';
import type { RowCount } from '../types/shared.types';
import type {
  UserCreate,
  UserCredentials,
  UserSelfUpdate,
  UserUpdate,
  UserWithImage,
} from '../types/users.types';

export class UsersQueries {
  private readonly database: Database;
  private readonly cache: CacheClient;

  constructor(database_: Database, cache_: CacheClient) {
    this.database = database_;
    this.cache = cache_;
  }

  async getUsers(limit: number, offset: number): Promise<UserWithImage[]> {
    const cachedUsersKey = UsersKeys.bulk(limit, offset);
    const cachedUsers = await this.cache.get<UserWithImage[]>(cachedUsersKey);
    if (cachedUsers) {
      return cachedUsers;
    }

    const users = await this.database.query.usersTable.findMany({
      limit,
      offset,
      columns: USERS_COLUMNS,
      with: { image: { columns: CORE_IMAGE_COLUMNS } },
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

    const [{ amountOfRows }] = await this.database
      .select({ amountOfRows: count(usersTable.id) })
      .from(usersTable)
      .execute();

    await this.cache.set(key, { amountOfRows });

    return { amountOfRows };
  }

  async getUserById(id: string): Promise<UserWithImage | undefined> {
    const cachedUserKey = UsersKeys.byId(id);
    const cachedUser = await this.cache.get<UserWithImage>(cachedUserKey);
    if (cachedUser) {
      return cachedUser;
    }

    const user = await this.database.query.usersTable.findFirst({
      where: eq(usersTable.id, id),
      columns: USERS_COLUMNS,
      with: { image: { columns: CORE_IMAGE_COLUMNS } },
    });

    if (!user) {
      return undefined;
    }

    await this.cache.set(cachedUserKey, user);

    return user;
  }

  async getUserCredentials(email: string): Promise<UserCredentials | undefined> {
    const cachedCredentialsKey = UsersKeys.credentials(email);
    const cachedCredentials = await this.cache.get<UserCredentials>(cachedCredentialsKey);
    if (cachedCredentials) {
      return cachedCredentials;
    }

    const user = await this.database.query.usersTable.findFirst({
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
    await this.database.insert(usersTable).values(user);
  }

  async updateUser(id: string, email: string, user: UserUpdate) {
    await this.cache.cleanPatterns(UsersKeys.onUpdate(id, email));
    await this.database.update(usersTable).set(user).where(eq(usersTable.id, id));
  }

  async selfUpdateUser(id: string, user: UserSelfUpdate) {
    await this.database.update(usersTable).set(user).where(eq(usersTable.id, id));
  }
}
