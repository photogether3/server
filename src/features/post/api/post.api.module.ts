import { Module } from '@nestjs/common';

import { PostAppModule } from '../app';
import { PostController } from './post.controller';

@Module({
    imports: [PostAppModule],
    controllers: [PostController],
})
export class PostApiModule {
}
