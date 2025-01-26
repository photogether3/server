import { Global, Module } from '@nestjs/common';

import { DrizzleService } from './drizzle.service';
import { DRIZZLE_ORM_TOKEN, provideDrizzleOrm } from './providers/drizzle.provider';
import { DrizzleRepository } from './drizzle.repository';

@Global()
@Module({
    providers: [
        provideDrizzleOrm(),
        DrizzleService,
        DrizzleRepository,
    ],
    exports: [
        DRIZZLE_ORM_TOKEN,
        DrizzleService,
        DrizzleRepository,
    ],
})
export class DatabaseModule {
}
