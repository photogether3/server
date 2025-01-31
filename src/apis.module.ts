import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';

import { AuthGuard, UserApiModule } from './features/user/api';
import { CategoryApiModule } from './features/category/api';
import { CollectionApiModule } from './features/collection/api';
import { PostApiModule } from './features/post/api';
import { AppExceptionFilter } from './system/exceptions';

@Module({
    imports: [
        UserApiModule,
        CategoryApiModule,
        CollectionApiModule,
        PostApiModule,
    ],
    providers: [
        { provide: APP_GUARD, useClass: AuthGuard },
        { provide: APP_FILTER, useClass: AppExceptionFilter },
    ],
})
export class ApisModule {
}
