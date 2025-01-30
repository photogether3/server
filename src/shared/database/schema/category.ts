import { primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { defaultTimestamps } from './base';
import { users } from '../schema';

export const categories = sqliteTable('categories', {
    categoryId: text({ length: 30 }).notNull().primaryKey(),
    name: text({ length: 50 }).notNull(),
    ...defaultTimestamps,
});

export const favorites = sqliteTable('favorites', {
    userId: text().notNull(), //text().notNull().references(() => users.id, { onDelete: 'cascade' }),
    categoryId: text().notNull().references(() => categories.categoryId, { onDelete: 'cascade' }),
    ...defaultTimestamps,
}, (table) => ({
    // userId와 refreshToken을 합쳐서 unique 제약조건 생성
    pk: primaryKey({ columns: [table.userId, table.categoryId] }),
}));
