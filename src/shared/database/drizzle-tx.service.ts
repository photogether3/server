import { Injectable } from '@nestjs/common';
import { DrizzleRepository } from './drizzle.repository';

/**
 * @desc Drizzle Orm 트랜잭션을 처리하는 클래스
 */
@Injectable()
export class DrizzleTxService extends DrizzleRepository {

    async runInTx<T>(callback: () => Promise<T>): Promise<T> {
        return this.db.transaction(async t => {
            return this.storage.run({ transaction: t }, callback);
        });
    }
}
