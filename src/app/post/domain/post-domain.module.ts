import { Module } from '@nestjs/common';

import { PostService } from './post.service';
import { PostMetadataService } from './post-metadata/post-metadata.service';
import { PostMetadataRepository, PostRepository } from '../infrastructure';

@Module({
    providers: [
        PostService,
        PostMetadataService,
        PostRepository,
        PostMetadataRepository,
    ],
    exports: [
        PostService,
        PostMetadataService,
    ],
})
export class PostDomainModule {
}
