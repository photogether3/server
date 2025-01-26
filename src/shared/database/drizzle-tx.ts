import { AsyncLocalStorage } from 'async_hooks';
import { SQLiteTransaction } from 'drizzle-orm/sqlite-core';

interface TransactionStore {
    transaction?: SQLiteTransaction<any, any, any, any>;
}

export const storage: AsyncLocalStorage<TransactionStore> = new AsyncLocalStorage();
