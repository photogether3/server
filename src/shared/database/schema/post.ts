import { int, primaryKey, sqliteTable, sqliteView, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

import { defaultTimestamps } from './base';

export const posts = sqliteTable('posts', {
    postId: text({ length: 30 }).notNull().primaryKey(),
    userId: text().notNull(), // text().notNull().references(() => users.id),
    collectionId: text().notNull(), // text().notNull().references(() => collections.collectionId),
    fileGroupId: text(), // text().references(() => fileGroups.fileGroupId),
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

// language=SQL format=false
export const postViews = sqliteView('post_views', {
    totalCount: int().notNull(),
    postId: text().notNull(),
    userId: text().notNull(),
    title: text().notNull(),
    content: text().notNull(),
    fileGroupId: text(),
    filePath: text(),
    createdAt: int({ mode: 'timestamp' }).notNull(),
    updatedAt: int({ mode: 'timestamp' }).notNull(),
    category: text(),
    collection: text(),
    metadata: text(),
}).as(
    // @formatter:off
    sql`
    SELECT
    COUNT(*) OVER (PARTITION BY a.user_id) AS total_count,
    a.post_id,
    a.title,
    a.content,
    a.user_id,
    a.created_at,
    a.updated_at,
    a.file_group_id,
    c.file_path,
    JSON_OBJECT(
           'collectionId', d.collection_id,
           'title', d.title
    ) AS collection,
    JSON_OBJECT(
           'categoryId', e.category_id,
           'name', e.name
    ) AS category,
    JSON_GROUP_ARRAY(
       JSON_OBJECT(
           'rank', b.rank,
           'content', b.content,
           'isPublic', b.is_public
       )
    ) AS metadata
    FROM posts a
    LEFT JOIN post_metadatas b ON b.post_id = a.post_id AND b.deleted_at IS NULL
    LEFT JOIN file_items c ON c.file_group_id = a.file_group_id AND c.deleted_at IS NULL
    LEFT JOIN collections d ON d.collection_id = a.collection_id AND d.deleted_at IS NULL
    LEFT JOIN categories e ON e.category_id = d.category_id AND e.deleted_at IS NULL
    WHERE a.deleted_at IS NULL
    GROUP BY a.post_id, a.title, a.content, a.created_at, a.updated_at, c.file_path, collection, category
`);

/**
 * DATETIME(, 'unixepoch', 'localtime') AS created_at,
 * DATETIME(, 'unixepoch', 'localtime') AS updated_at,
 */
