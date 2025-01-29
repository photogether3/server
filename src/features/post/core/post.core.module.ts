import { Module } from '@nestjs/common';

import { PostService } from './services/post.service';
import { PostMetadataService } from './services/post-metadata.service';
import { PostMetadataRepository, PostRepository } from '../infra';

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
export class PostCoreModule {
}
