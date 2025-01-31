import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { and, eq, inArray, isNull } from 'drizzle-orm';

import { DrizzleRepository, posts } from 'src/shared/database';

import { PostModel } from '../models/post.model';

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

    async findPostByUserIdWithPostId(userId: string, postId: string) {
        const result = await this.db
            .select()
            .from(posts)
            .where(and(
                eq(posts.userId, userId),
                eq(posts.postId, postId),
                isNull(posts.deletedAt),
            ))
            .get();
        if (!result) return null;
        return this.fromDrizzleModel(PostModel, result);
    }

    async save(post: PostModel) {
        await this.db
            .insert(posts)
            .values(post.toPlainObject())
            .onConflictDoUpdate({
                target: posts.postId,
                set: post.toPlainObject(),
            })
            .catch(err => {
                throw new InternalServerErrorException(err);
            });
    }

    async updateCollectionId(_posts: PostModel[]) {
        await this.db
            .update(posts)
            .set(<any>{
                collectionId: _posts[0].collectionId,
            })
            .where(inArray(posts.postId, _posts.map(x => x.postId)))
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
