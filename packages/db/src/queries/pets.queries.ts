import { eq, sql } from 'drizzle-orm';

import type { Database } from '../client';
import { PETS_COLUMNS } from '../columns/pets.columns';
import { petsTable } from '../schema';
import type { PetCreate, Pets } from '../types/pets.types';

export class PetsQueries {
  private readonly db: Database;
  constructor(database: Database) {
    this.db = database;
  }

  async getPets(): Promise<Pets[]> {
    return this.db.query.petsTable.findMany({ columns: PETS_COLUMNS });
  }

  async getPetById(id: string): Promise<Pets | undefined> {
    const query = this.db.query.petsTable
      .findFirst({
        where: eq(petsTable.id, sql.placeholder('id')),
        columns: PETS_COLUMNS,
      })
      .prepare('getPetById');

    return query.execute({ id });
  }

  async getPetsByOwnerId(ownerId: string): Promise<Pets[]> {
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

    await query.execute({ name: user.name });
  }
}
