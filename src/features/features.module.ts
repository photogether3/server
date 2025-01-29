import { Module } from '@nestjs/common';

import { UserApiModule } from './user/api';
import { CategoryApiModule } from './category/api';
import { CollectionApiModule } from './collection/api';
import { PostApiModule } from './post/api';

@Module({
    imports: [
        UserApiModule,
        CategoryApiModule,
        CollectionApiModule,
        PostApiModule
    ],
})
export class FeaturesModule {
}
