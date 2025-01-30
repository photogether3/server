import { int, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { defaultTimestamps } from './base';

export const fileGroups = sqliteTable('file_groups', {
    fileGroupId: text({ length: 30 }).notNull().primaryKey(),
    flag: text({ length: 10 }).default('TEMP').notNull(),
    ...defaultTimestamps,
});

export const fileItems = sqliteTable('file_items', {
    fileGroupId: text().notNull().references(() => fileGroups.fileGroupId),
    rank: int().notNull(),
    filePath: text({ length: 200 }).notNull().unique(),
    fileName: text({ length: 100 }).notNull(),
    originalFileName: text({ length: 100 }).notNull(),
    mimeType: text({ length: 20 }).notNull(),
    ...defaultTimestamps,
}, (table) => ({
    pk: primaryKey({ columns: [table.fileGroupId, table.rank] }),
}));
