import { Module } from '@nestjs/common';

import { PostService } from './services/post.service';
import { PostMetadataService } from './services/post-metadata.service';
import { PostRepository } from './repositories/post.repository';
import { PostMetadataRepository } from './repositories/post-metadata.repository';

@Module({
    providers: [
        PostRepository,
        PostMetadataRepository,
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
