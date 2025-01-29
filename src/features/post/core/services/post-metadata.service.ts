import { Injectable } from '@nestjs/common';

import { PostMetadataRepository } from '../../infra';
import { CreatePostMetadataBodyDto } from '../dto/post-metadata.dto';
import { PostMetadataModel } from '../models/post-metadata.model';

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
}
