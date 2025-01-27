import { Injectable } from '@nestjs/common';

import { CreatePostDto, GetPostsQueryDto } from './dto';
import { PostModel } from './post.model';
import { PostRepository } from '../infrastructure';

@Injectable()
export class PostService {

    constructor(
        private readonly postRepository: PostRepository,
    ) {
    }

    /**
     * @todo 게시물 페이징 목록을 조회합니다.
     */
    async getPosts(userId: string, dto: GetPostsQueryDto) {
        return await this.postRepository.findPosts(userId, dto);
    }

    /**
     * @todo 게시물 모델을 생성하고 DB에 저장합니다.
     */
    async create(userId: string, dto: CreatePostDto) {
        const post = PostModel.from(userId, dto);
        await this.postRepository.save(post);
        return post;
    }
}
