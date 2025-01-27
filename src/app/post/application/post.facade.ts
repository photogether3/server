import { Injectable } from '@nestjs/common';

import { DrizzleService } from 'src/shared/database';

import { CollectionService } from '../../collection/domain';
import { FileManager } from '../../file/application';

import {
    CreatePostBodyDto,
    CreatePostDto,
    CreatePostMetadataBodyDto,
    GetPostsQueryDto,
    PostMetadataService,
    PostService,
} from '../domain';

@Injectable()
export class PostFacade {

    constructor(
        private readonly fileManager: FileManager,
        private readonly drizzleService: DrizzleService,
        private readonly collectionService: CollectionService,
        private readonly postService: PostService,
        private readonly postMetadataService: PostMetadataService,
    ) {
    }

    async getPosts(userId: string, dto: GetPostsQueryDto) {
        return await this.postService.getPosts(userId, dto);
    }

    async create(userId: string, _dto: CreatePostBodyDto, metadataDtos: CreatePostMetadataBodyDto[]) {
        const { file, ...dto } = _dto;

        await this.collectionService.getCollection(userId, dto.collectionId);

        return await this.drizzleService.runInTx(async () => {
            let createPostDto: CreatePostDto = { ...dto, fileGroupId: null };
            if (_dto.file) {
                const { fileGroupId } = await this.fileManager.upload(userId, file);
                createPostDto = { ...dto, fileGroupId };
            }
            const post = await this.postService.create(userId, createPostDto);
            await this.postMetadataService.creates(post.postId, metadataDtos);
        });
    }
}
