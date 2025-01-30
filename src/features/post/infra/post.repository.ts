import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { and, eq, inArray, isNull } from 'drizzle-orm';

import { DrizzleRepository, posts } from 'src/shared/database';

import { PostModel } from '../core';

@Injectable()
export class PostRepository extends DrizzleRepository {

    async findPostsByUserIdWithPostIds(userId: string, postIds: string[]) {
        const results = await this.db
            .select()
            .from(posts)
            .where(and(
                eq(posts.userId, userId),
                inArray(posts.postId, postIds),
                isNull(posts.deletedAt),
            ));
        return results.map(x => this.fromDrizzleModel(PostModel, x));
    }

    async save(post: PostModel) {
        await this.db
            .insert(posts)
            .values(post.toPlainObject())
            .catch(err => {
                throw new InternalServerErrorException(err);
            });
    }

    async removes(_posts: PostModel[]) {
        await this.db
            .update(posts)
            .set(<any>{
                deletedAt: new Date(),
            })
            .where(inArray(posts.postId, _posts.map(x => x.postId)));
    }
}
