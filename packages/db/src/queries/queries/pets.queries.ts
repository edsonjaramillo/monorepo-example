import { eq, sql } from 'drizzle-orm';

import { db } from '../client';
import { PETS_COLUMNS } from '../columns/pets.columns';
import { petsTable } from '../schema';
import type { PetCreate } from '../types/pets.types';

export class PetsQueries {
  static async getPets() {
    return await db.query.petsTable.findMany({ columns: PETS_COLUMNS });
  }

  static async getPetById(id: string) {
    const query = db.query.petsTable
      .findFirst({
        where: eq(petsTable.id, sql.placeholder('id')),
        columns: PETS_COLUMNS,
      })
      .prepare('getPetById');

    return query.execute({ id });
  }

  static async getPetsByOwnerId(ownerId: string) {
    const query = db.query.petsTable
      .findMany({
        where: eq(petsTable.ownerId, sql.placeholder('ownerId')),
        columns: PETS_COLUMNS,
      })
      .prepare('getPetsByOwnerId');

    return query.execute({ ownerId });
  }

  static async createPet(user: PetCreate) {
    const query = db
      .insert(petsTable)
      .values({ name: sql.placeholder('name') })
      .prepare('createPet');

    return query.execute({ name: user.name });
  }
}
