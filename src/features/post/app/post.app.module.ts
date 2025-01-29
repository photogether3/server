import { Module } from '@nestjs/common';

import { CollectionCoreModule } from '../../collection/core';
import { PostCoreModule } from '../core';
import { FileAppModule } from '../../file/app';

import { PostFacade } from './post.facade';

@Module({
    imports: [
        PostCoreModule,
        FileAppModule,
        CollectionCoreModule,
    ],
    providers: [PostFacade],
    exports: [PostFacade],
})
export class PostAppModule {
}
