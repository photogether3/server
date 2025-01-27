import { int, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { defaultTimestamps } from './base';
import { users } from './user';
import { collections } from './collection';
import { fileGroups } from './file';

export const posts = sqliteTable('posts', {
    postId: text({ length: 30 }).notNull().primaryKey(),
    userId: text().notNull().references(() => users.id),
    collectionId: text().notNull().references(() => collections.collectionId),
    fileGroupId: text().references(() => fileGroups.fileGroupId),
    title: text({ length: 50 }),
    content: text({ length: 200 }),
    ...defaultTimestamps,
});

export const postMetadatas = sqliteTable('post_metadatas', {
    postId: text().notNull().references(() => posts.postId),
    rank: int().notNull(),
    content: text({ length: 100 }).notNull(),
    isPublic: int({ mode: 'boolean' }).notNull(),
    ...defaultTimestamps,
}, (table) => ({
    pk: primaryKey({ columns: [table.postId, table.rank] }),
}));
