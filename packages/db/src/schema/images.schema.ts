import { relations } from 'drizzle-orm';
import { index, pgEnum, pgTable, smallint, varchar } from 'drizzle-orm/pg-core';

import { folders } from 'common';

import { createdAt, id, updatedAt } from './fields';
import { usersTable } from './users.schema';

export const foldersEnum = pgEnum('folder', folders);

const coreImageFields = {
  id,
  folder: foldersEnum('folder').default('misc').notNull(),
  filename: varchar('filename', { length: 255 }).notNull(),
  url: varchar('url', { length: 255 }).notNull(),
  width: smallint('width').notNull(),
  height: smallint('height').notNull(),
  blurDataUrl: varchar('blur_data_url', { length: 1000 }).notNull(),
  createdAt,
  updatedAt,
} as const;

export const imagesTable = pgTable(
  'images',
  {
    ...coreImageFields,
    userId: varchar('user_id', { length: 255 }),
  },
  (table) => ({ folderIdx: index('folder_idx').on(table.folder) }),
);

export const imagesRelations = relations(imagesTable, ({ one }) => ({
  user: one(usersTable, { fields: [imagesTable.userId], references: [usersTable.image] }),
}));
