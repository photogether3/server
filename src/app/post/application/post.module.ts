import { Module } from '@nestjs/common';

import { FileModule } from '../../file/application';

import { PostController } from './post.controller';
import { PostFacade } from './post.facade';

@Module({
    imports: [
        FileModule,
    ],
    controllers: [PostController],
    providers: [PostFacade],
})
export class PostModule {
}
