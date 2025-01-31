import { Injectable } from '@nestjs/common';

import { CreatePostMetadataBodyDto } from '../dto/post-metadata.dto';
import { PostMetadataModel } from '../models/post-metadata.model';
import { PostMetadataRepository } from '../repositories/post-metadata.repository';

@Injectable()
export class PostMetadataService {

    constructor(
        private readonly postMetadataRepository: PostMetadataRepository,
    ) {
    }

    /**
     * @todo 포스트 메타데이터 모델 목록을 생성, DB에 저장합니다.
     */
    async creates(postId: string, dtos: CreatePostMetadataBodyDto[]): Promise<PostMetadataModel[]> {
        const metadataModels = dtos.map((dto, index) =>
            PostMetadataModel.from(postId, index + 1, dto),
        );
        await this.postMetadataRepository.saves(metadataModels);
        return metadataModels;
    }

    /**
     * @todo 포스트 ID에 해당하는 메타데이터들을 삭제합니다.
     */
    async removes(postId: string): Promise<void> {
        await this.postMetadataRepository.removes(postId);
    }
}
