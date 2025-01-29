import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sql } from 'drizzle-orm';

import { DrizzleRepository, posts } from 'src/shared/database';
import { PaginationUtil } from 'src/shared/base';

import { GetPostsQueryDto, PostModel, PostPaginationResultDTO, PostResultDto } from '../core';

@Injectable()
export class PostRepository extends DrizzleRepository {

    async findPosts(userId: string, dto: GetPostsQueryDto) {
        const { perPage, page, sortOrder, sortBy } = dto;
        const paginationUtil = new PaginationUtil(page, perPage);

        // @formatter:off
        const result = await this.db.run(sql`
            SELECT
                COUNT(*) OVER (PARTITION BY a.user_id) AS total_count,
                a.post_id,
                a.title,
                a.content,
                DATETIME(a.created_at, 'unixepoch', 'localtime') AS created_at,
                DATETIME(a.updated_at, 'unixepoch', 'localtime') AS updated_at,
                JSON_GROUP_ARRAY(
                    JSON_OBJECT(
                        'rank', b.rank,
                        'content', b.content
                    )
                ) AS metadata
            FROM posts a
            LEFT JOIN post_metadatas b on b.post_id = a.post_id
            WHERE 1 = 1
              AND a.user_id = ${userId}
            GROUP BY a.post_id, a.title, a.content, a.created_at, a.updated_at
            ORDER BY a.${sql.raw(sortBy)} ${sql.raw(sortOrder)}
            LIMIT ${perPage}
            OFFSET ${paginationUtil.offset}
        `);

        if (result.rows.length === 0) {
            return PostPaginationResultDTO.fromNullData();
        }

        const items = result.rows.map(x => {
            const metadata = JSON.parse(x.metadata);
            return {
                postId: x.post_id,
                content: x.content,
                title: x.title,
                createdAt: x.created_at,
                updatedAt: x.updated_at,
                metadataList: metadata,
            } as PostResultDto;
        });

        const totalItemCount = result.rows[0].total_count;
        return paginationUtil.generate<PostResultDto>(totalItemCount, items);
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
