import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { LibSQLDatabase } from 'drizzle-orm/libsql';

import { DRIZZLE_ORM_TOKEN, DrizzleRepository, posts, postViews } from 'src/shared/database';
import { PaginationUtil } from 'src/shared/base';
import { EnvService } from 'src/shared/env';

import { GetPostsQueryDto, PostModel, PostPaginationResultDTO, PostViewModel } from '../core';

@Injectable()
export class PostRepository extends DrizzleRepository {

    private readonly publicUrl: string;

    constructor(
        @Inject(DRIZZLE_ORM_TOKEN)
        protected readonly _db: LibSQLDatabase,
        private readonly envService: EnvService,
    ) {
        super(_db);
        this.publicUrl = this.envService.getFirebaseEnv().storageUrl;
    }

    async findPosts(userId: string, dto: GetPostsQueryDto) {
        const { perPage, page, sortOrder, sortBy } = dto;
        const paginationUtil = new PaginationUtil(page, perPage);

        const results = await this.db
            .select()
            .from(postViews)
            .where(eq(postViews.userId, userId))
            // @formatter:off
            .orderBy(sql`${sql.raw(sortBy)} ${sql.raw(sortOrder)}`)
            .limit(perPage)
            .offset(paginationUtil.offset);

        if (results.length === 0) {
            return PostPaginationResultDTO.fromNullData();
        }

        const items = results.map(x =>
            PostViewModel.fromPersistence(x, this.publicUrl)
        );
        const totalItemCount = results[0].totalCount;
        return paginationUtil.generate<PostViewModel>(totalItemCount, items);
    }

    async save(post: PostModel) {
        await this.db
            .insert(posts)
            .values(post.toPlainObject())
            .catch(err => {
                throw new InternalServerErrorException(err);
            });
    }
}
