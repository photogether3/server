import { int, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

import { defaultTimestamps } from './base';

export const users = sqliteTable('users', {
    id: text({ length: 30 }).primaryKey(),
    fileGroupId: text(), // text().references(() => fileGroups.fileGroupId),
    nickname: text({ length: 20 }).notNull(),
    bio: text({ length: 50 }),
    email: text({ length: 50 }).notNull().unique(),
    isEmailVerified: int({ mode: 'boolean' }).notNull(),
    password: text({ length: 200 }),
    otp: text({ length: 6 }),
    otpExpiryDate: int({ mode: 'timestamp' }),
    ...defaultTimestamps,
});

export const userTokens = sqliteTable('user_tokens', {
    id: text({ length: 30 }).notNull().primaryKey(),
    userId: text().notNull().references(() => users.id, { onDelete: 'cascade' }),
    refreshToken: text({ length: 100 }).notNull(),
    expiryDate: int({ mode: 'timestamp' }),
    lastRefreshingDate: int({ mode: 'timestamp' }),
    ...defaultTimestamps,
}, (table) => ({
    // userId와 refreshToken을 합쳐서 unique 제약조건 생성
    userTokenUnique: uniqueIndex('user_token_unique_idx').on(table.userId, table.refreshToken),
}));
