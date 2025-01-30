import { int, sqliteTable, sqliteView, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { defaultTimestamps } from './base';

export const collections = sqliteTable('collections', {
    collectionId: text({ length: 30 }).notNull().primaryKey(),
    userId: text().notNull(), // text().notNull().references(() => users.id),
    categoryId: text().notNull(), // text().notNull().references(() => categories.categoryId),
    title: text({ length: 50 }).notNull(),
    ...defaultTimestamps,
});

export const collectionViews = sqliteView('collection_views', {
    totalCount: int().notNull(),
    postCount: int().notNull(),
    collectionId: text().notNull(),
    categoryId: text().notNull(),
    userId: text().notNull(),
    title: text().notNull(),
    createdAt: int({ mode: 'timestamp' }).notNull(),
    updatedAt: int({ mode: 'timestamp' }).notNull(),
    category: text(),
    filePaths: text(),
}).as(
    // @formatter:off
    sql`
    SELECT
        COUNT(*) OVER (PARTITION BY a.user_id) AS total_count,
        COUNT(DISTINCT b.post_id) AS post_count,
        a.collection_id,
        a.category_id,
        a.user_id,
        a.title,
        a.created_at,
        JSON_OBJECT(
            'categoryId', d.category_id,
            'name', d.name
        ) AS category,
        JSON_GROUP_ARRAY(
            JSON_OBJECT(
                'filePath', c.file_path
            )
        ) AS file_paths
    FROM collections a
    LEFT JOIN posts b on b.collection_id = a.collection_id and b.deleted_at is null
    LEFT JOIN file_items c on c.file_group_id = b.file_group_id and c.deleted_at is null
    LEFT JOIN categories d on d.category_id = a.category_id and d.deleted_at is null
    WHERE a.deleted_at IS NULL
    GROUP BY a.collection_id, a.category_id, a.user_id, a.title, a.created_at
`);
