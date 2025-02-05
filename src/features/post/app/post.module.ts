import { Module } from '@nestjs/common';

import { PostMetadataRepository } from './repositories/post-metadata.repository';
import { PostQueryRepository } from './repositories/post.query.repository';
import { PostRepository } from './repositories/post.repository';
import { PostMetadataService } from './services/post-metadata.service';
import { PostService } from './services/post.service';

@Module({
    providers: [
        PostRepository,
        PostMetadataRepository,
        PostQueryRepository,
        PostMetadataService,
        PostService,
    ],
    exports: [
        PostMetadataService,
        PostService,
    ],
})
export class PostModule {
}
