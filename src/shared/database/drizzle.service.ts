import { Injectable, Logger } from '@nestjs/common';
import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { SQLiteTransaction } from 'drizzle-orm/sqlite-core';
import { AsyncLocalStorage } from 'async_hooks';

import { EnvService } from '../env';

interface TransactionStore {
    transaction?: SQLiteTransaction<any, any, any, any>;
}

@Injectable()
export class DrizzleService {

    private readonly storage: AsyncLocalStorage<TransactionStore> = new AsyncLocalStorage();

    private readonly _db: LibSQLDatabase;

    constructor(
        private readonly envService: EnvService,
    ) {
        Logger.debug('Drizzle DB Init');
        const { url, authToken } = this.envService.getDBEnv();
        const client = createClient({ url, authToken });
        this._db = drizzle(client);
    }

    get db() {
        if (!this._db) {
            throw new Error('not connect to DB.');
        }

        /**
         * 트랜잭션이 존재하는 상태이면 트랜잭션을 사용하도록 합니다.
         */
        return this.storage.getStore()?.transaction ?? this._db;
    }

    async runInTx<T>(callback: () => Promise<T>): Promise<T> {
        return await this._db.transaction(async t => {
            return this.storage.run({ transaction: t }, callback);
        });
    }
}
