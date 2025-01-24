import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { categories, users } from '../schema';
import { defaultTimestamps } from './base';

export const collections = sqliteTable('collections', {
    collectionId: text({ length: 30 }).notNull().primaryKey(),
    userId: text().notNull().references(() => users.id),
    categoryId: text().notNull().references(() => categories.categoryId),
    title: text({ length: 50 }).notNull(),
    ...defaultTimestamps,
});
