import { Module } from '@nestjs/common';

import { CollectionCoreModule } from '../../collection/core';
import { FileAppModule } from '../../file/app';

import { PostCoreModule } from '../core';
import { PostQueryRepository } from '../infra';
import { PostFacade } from './post.facade';

@Module({
    imports: [
        PostCoreModule,
        FileAppModule,
        CollectionCoreModule,
    ],
    providers: [
        PostQueryRepository,
        PostFacade,
    ],
    exports: [PostFacade],
})
export class PostAppModule {
}
