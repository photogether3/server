import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { favorites, users } from '../schema';
import { defaultTimestamps } from './base';

export const collections = sqliteTable('collections', {
    collectionId: text({ length: 30 }).notNull().primaryKey(),
    userId: text().notNull().references(() => users.id),
    favoriteId: text().notNull().references(() => favorites.favoriteId),
    title: text({ length: 50 }).notNull(),
    ...defaultTimestamps,
});
