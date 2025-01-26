import { Global, Module } from '@nestjs/common';

import { DrizzleTxService } from './drizzle-tx.service';
import { DRIZZLE_ORM_TOKEN, provideDrizzleOrm } from './providers/drizzle.provider';
import { DrizzleRepository } from './drizzle.repository';

@Global()
@Module({
    providers: [
        provideDrizzleOrm(),
        DrizzleTxService,
        DrizzleRepository,
    ],
    exports: [
        DRIZZLE_ORM_TOKEN,
        DrizzleTxService,
        DrizzleRepository,
    ],
})
export class DatabaseModule {
}
