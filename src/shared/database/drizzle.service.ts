import { Inject, Injectable } from '@nestjs/common';
import { LibSQLDatabase } from 'drizzle-orm/libsql';

import { storage } from './drizzle-tx';
import { DRIZZLE_ORM_TOKEN } from './providers/drizzle.provider';

/**
 * @desc Drizzle Orm 트랜잭션을 처리하는 클래스
 */
@Injectable()
export class DrizzleService {

  constructor(
    @Inject(DRIZZLE_ORM_TOKEN)
    private readonly db: LibSQLDatabase,
  ) {
  }

  /**
   * @todo 현재 요청 컨텍스트에 한해서 트랜잭션을 메모리에 저장하고, 콜백함수 내용을 실행시킵니다.
   * @info 트랜잭션이 메모리에 저장되어있으면 `drizzleRepository`는
   * db 인스턴스 대신 트랜잭션을 통해 작업을 수행합니다.
   * 따라서 콜백함수 내에서 에러 발생시 작업한 내용들이 롤백됩니다.
   */
  async runInTx<T>(callback: () => Promise<T>): Promise<T> {
    return this.db.transaction(async t => {
      return storage.run({ transaction: t }, callback);
    });
  }
}
