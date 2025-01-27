import { Module } from '@nestjs/common';

import { FileModule } from '../../file/application';
import { CollectionDomainModule } from '../../collection/domain';

import { PostController } from './post.controller';
import { PostFacade } from './post.facade';
import { PostDomainModule } from '../domain';

@Module({
    imports: [
        FileModule,
        CollectionDomainModule,
        PostDomainModule,
    ],
    controllers: [PostController],
    providers: [PostFacade],
})
export class PostModule {
}
