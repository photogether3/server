import { Injectable } from '@nestjs/common';

import { DrizzleService } from 'src/shared/database';

import { FileManager } from '../../file/app';
import { CollectionService } from '../../collection/core';

import {
    CreatePostBodyDto,
    CreatePostDto,
    CreatePostMetadataBodyDto,
    GetPostsQueryDto,
    PostMetadataService,
    PostService,
    RemovePostsBodyDto,
} from '../core';
import { PostQueryRepository } from '../infra';

@Injectable()
export class PostFacade {

    constructor(
        private readonly fileManager: FileManager,
        private readonly drizzleService: DrizzleService,
        private readonly collectionService: CollectionService,
        private readonly postMetadataService: PostMetadataService,
        private readonly postService: PostService,
        private readonly postQueryRepository: PostQueryRepository,
    ) {
    }

    async getPostViews(userId: string, dto: GetPostsQueryDto) {
        return await this.postQueryRepository.filePostViews(userId, dto);
    }

    async create(userId: string, _dto: CreatePostBodyDto, metadataDtos: CreatePostMetadataBodyDto[]) {
        const { file, ...dto } = _dto;

        await this.collectionService.getCollection(userId, dto.collectionId);

        return await this.drizzleService.runInTx(async () => {
            let createPostDto: CreatePostDto = { ...dto, fileGroupId: null };
            if (_dto.file) {
                const { fileGroupId } = await this.fileManager.upload(file);
                createPostDto = { ...dto, fileGroupId };
            }
            const post = await this.postService.create(userId, createPostDto);
            await this.postMetadataService.creates(post.postId, metadataDtos);
        });
    }

    async removes(userId: string, dto: RemovePostsBodyDto) {
        const post = await this.postService.getPostsByUserIdWithPostIds(userId, dto.postIds);
        await this.postService.removes(post);
    }
}
