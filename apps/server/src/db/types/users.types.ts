import type { DEFAULT_USERS_COLUMNS } from '../columns/users.columns';
import { usersTable } from '../schema';
import { Pets } from './pets.types';

// only get the values that overlap from usersTable.$inferSelect and UsersColumns
export type User = Pick<typeof usersTable.$inferSelect, keyof typeof DEFAULT_USERS_COLUMNS>;
export type UserCreate = typeof usersTable.$inferInsert;
export type UserWithPets = User & { pets: Pets[] };
