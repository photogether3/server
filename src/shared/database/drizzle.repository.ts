import { plainToInstance } from 'class-transformer';
import { Inject, Injectable, Type } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { SQLiteTransaction } from 'drizzle-orm/sqlite-core';
import { LibSQLDatabase } from 'drizzle-orm/libsql';

import { DRIZZLE_ORM_TOKEN } from './providers/drizzle.provider';

interface TransactionStore {
    transaction?: SQLiteTransaction<any, any, any, any>;
}

@Injectable()
export class DrizzleRepository {

    protected readonly storage: AsyncLocalStorage<TransactionStore> = new AsyncLocalStorage();

    constructor(
        @Inject(DRIZZLE_ORM_TOKEN)
        private readonly _db: LibSQLDatabase,
    ) {
    }

    /**
     * @todo drizzle orm에서 제공하는 db를 반환합니다.
     * @info 트랜잭션이 존재하는 상태이면 트랜잭션을 사용하도록 합니다.
     * @error 데이터베이스 커넥션이 없으면 에러처리합니다.
     */
    get db() {
        if (!this._db) throw new Error('not connect to DB.');
        return this.storage.getStore()?.transaction ?? this._db;
    }

    /**
     * @todo drizzle orm에서 조회된 데이터를 특정 모델로 변환합니다.
     * @info param 데이터가 없으면 null을 반환합니다.
     */
    fromDrizzleModel<T>(model: Type<T>, param: any): T | null {
        if (!param) return null;
        return plainToInstance(model, param);
    }
}
