import { BadRequestException, Injectable } from '@nestjs/common';

import { PostRepository } from '../../infra';
import { CreatePostDto } from '../dto/post.dto';
import { PostModel } from '../models/post.model';

@Injectable()
export class PostService {

    constructor(
        private readonly postRepository: PostRepository,
    ) {
    }

    /**
     * @todo 사용자의 게시물 목록을 조회합니다.
     * @throw 게시물ID 와 게시물의 개수가 다르면 에러처리합니다.
     */
    async getPostsByUserIdWithPostIds(userId: string, postIds: string[]): Promise<PostModel[]> {
        const posts = await this.postRepository.findPostsByUserIdWithPostIds(userId, postIds);
        if (postIds.length !== posts.length) {
            throw new BadRequestException('잘못된 게시물 입니다.');
        }
        return posts;
    }

    /**
     * @todo 게시물 모델을 생성하고 DB에 저장합니다.
     */
    async create(userId: string, dto: CreatePostDto): Promise<PostModel> {
        const post = PostModel.from(userId, dto);
        await this.postRepository.save(post);
        return post;
    }

    /**
     * @todo 게시물 목록을 삭제합니다.
     */
    async removes(posts: PostModel[]): Promise<void> {
        posts = posts.map(x => x.withRemove());
        await this.postRepository.removes(posts);
    }
}
