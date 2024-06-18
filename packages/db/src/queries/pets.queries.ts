import { eq, sql } from 'drizzle-orm';

import type { DB } from '../client';
import { PETS_COLUMNS } from '../columns/pets.columns';
import { petsTable } from '../schema';
import type { PetCreate } from '../types/pets.types';

export class PetsQueries {
  private db: DB;
  constructor(db: DB) {
    this.db = db;
  }

  async getPets() {
    return await this.db.query.petsTable.findMany({ columns: PETS_COLUMNS });
  }

  async getPetById(id: string) {
    const query = this.db.query.petsTable
      .findFirst({
        where: eq(petsTable.id, sql.placeholder('id')),
        columns: PETS_COLUMNS,
      })
      .prepare('getPetById');

    return query.execute({ id });
  }

  async getPetsByOwnerId(ownerId: string) {
    const query = this.db.query.petsTable
      .findMany({
        where: eq(petsTable.ownerId, sql.placeholder('ownerId')),
        columns: PETS_COLUMNS,
      })
      .prepare('getPetsByOwnerId');

    return query.execute({ ownerId });
  }

  async createPet(user: PetCreate) {
    const query = this.db
      .insert(petsTable)
      .values({ name: sql.placeholder('name') })
      .prepare('createPet');

    return query.execute({ name: user.name });
  }
}
