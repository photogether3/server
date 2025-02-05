import { Inject, Injectable } from '@nestjs/common';
import { and, eq, sql } from 'drizzle-orm';
import { LibSQLDatabase } from 'drizzle-orm/libsql';

import { DRIZZLE_ORM_TOKEN, DrizzleRepository, postViews } from 'src/shared/database';
import { EnvService } from 'src/shared/env';

import { ReqGetPostsDto, PostPaginationResultDTO } from '../dto/post.dto';
import { PostViewModel } from '../view-models/post.view-model';

@Injectable()
export class PostQueryRepository extends DrizzleRepository {

    private readonly publicUrl: string;

    constructor(
        @Inject(DRIZZLE_ORM_TOKEN)
        protected readonly _db: LibSQLDatabase,
        private readonly envService: EnvService,
    ) {
        super(_db);
        this.publicUrl = this.envService.getFirebaseEnv().storageUrl;
    }

    async findPostViews(userId: string, dto: ReqGetPostsDto) {
        const { perPage, page, sortOrder, sortBy, collectionId } = dto;

        const qb = this.db
            .select()
            .from(postViews)
            .where(and(
                eq(postViews.userId, userId),
                eq(postViews.collectionId, collectionId)
            ))
            .orderBy(sql`${sql.raw(sortBy)} ${sql.raw(sortOrder)}`)
            .$dynamic();

        return await this.withPagination<PostViewModel>(qb, page, perPage, (results) =>
            results.map(x =>
                PostViewModel.fromPersistence(x, this.publicUrl)
            )
        );
    }
}
