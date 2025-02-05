import { Inject, Injectable, Logger, Type } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { SQLiteSelect } from 'drizzle-orm/sqlite-core';

import { PaginationDto } from '../base';
import { storage } from './drizzle-tx';
import { DRIZZLE_ORM_TOKEN } from './providers/drizzle.provider';

@Injectable()
export class DrizzleRepository {

    constructor(
        @Inject(DRIZZLE_ORM_TOKEN)
        protected readonly _db: LibSQLDatabase,
    ) {
    }

    /**
     * @todo drizzle orm에서 제공하는 db를 반환합니다.
     * @info 트랜잭션이 존재하는 상태이면 트랜잭션을 사용하도록 합니다.
     * @error 데이터베이스 커넥션이 없으면 에러처리합니다.
     */
    get db() {
        if (!this._db) throw new Error('not connect to DB.');
        return storage.getStore()?.transaction ?? this._db;
    }

    /**
     * @todo 다이나믹 쿼리빌더를 전달받아 페이징 기능을 수행합니다.
     * @warning 첫번째 열(또는 모든 열)에 `totalCount` 컬럼이 존재하는걸 전재로 기능을 수행합니다.
     */
    async withPagination<T>(
        qb: SQLiteSelect,
        page: number = 1,
        perPage: number = 10,
        callback: (data: any) => T[]
    ): Promise<PaginationDto<T>> {
        const results = await qb.limit(perPage).offset((page - 1) * perPage);
        if (results.length === 0) {
            return PaginationDto.fromNullData();
        }

        Logger.log(results);

        const items = callback(results);
        const totalItemCount = results[0].totalCount;
        return {
            totalItemCount,
            totalPageCount: Math.ceil(totalItemCount / perPage),
            items,
            perPage: perPage,
            currentPage: page,
        };
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
