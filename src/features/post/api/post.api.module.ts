import { Module } from '@nestjs/common';

import { FileModule } from 'src/features/file/app';
import { CollectionModule } from 'src/features/collection/app';
import { PostModule, PostQueryRepository } from 'src/features/post/app';

import { PostController } from './post.controller';
import { PostFacade } from './post.facade';

@Module({
    imports: [
        CollectionModule,
        FileModule,
        PostModule,
    ],
    controllers: [PostController],
    providers: [PostFacade, PostQueryRepository],
})
export class PostApiModule {
}
