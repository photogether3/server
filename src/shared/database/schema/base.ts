import { int } from 'drizzle-orm/sqlite-core';

export const defaultTimestamps = {
    createdAt: int('created_at', { mode: 'timestamp' }),
    updatedAt: int('updated_at', { mode: 'timestamp' }),
    deletedAt: int('deleted_at', { mode: 'timestamp' }),
};
