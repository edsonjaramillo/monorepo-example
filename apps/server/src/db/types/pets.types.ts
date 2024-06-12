import { PETS_COLUMNS } from '../columns/pets.columns';
import { petsTable } from '../schema';

export type Pets = Pick<typeof petsTable.$inferSelect, keyof typeof PETS_COLUMNS>;
export type PetCreate = typeof petsTable.$inferInsert;
