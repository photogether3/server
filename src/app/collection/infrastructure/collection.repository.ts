import { Injectable } from '@nestjs/common';
import { and, eq, sql } from 'drizzle-orm';

import { collections, DrizzleRepository } from 'src/shared/database';
import { PaginationUtil } from 'src/shared/base';

import { CollectionModel, CollectionPaginationDto, CollectionResultDto } from '../domain';
import { GetCollectionsQueryDto } from '../application/request-dto';

@Injectable()
export class CollectionRepository extends DrizzleRepository {

    /**
     * @warning 다른 도메인 모듈의 테이블을 참조합니다.
     */
    async findPagedCollections(userId: string, dto: GetCollectionsQueryDto) {
        const { perPage, page, sortOrder, sortBy } = dto;

        const paginationUtil = new PaginationUtil(page, perPage);

        // @formatter:off
        const result = await this.db.run(sql`
            SELECT COUNT(*) OVER (PARTITION BY c.user_id) AS total_count, c.*
            FROM collections c
            WHERE c.user_id = ${userId}
            ORDER BY c.${sql.raw(sortBy)} ${sql.raw(sortOrder)}
            LIMIT ${perPage}
            OFFSET ${paginationUtil.offset}
        `);

        if (result.rows.length === 0) {
            return CollectionPaginationDto.fromNullData();
        }

        const items = result.rows.map(x => ({
            collectionId: x.collection_id,
            imageUrls: [],
            title: x.title,
            totalItemCount: 0,
        } as CollectionResultDto));

        const totalItemCount = result.rows[0].total_count;
        return paginationUtil.generate<CollectionResultDto>(totalItemCount, items);
    }

    async findCollection(userId:string, collectionId:string) {
        const result = await this.db
            .select()
            .from(collections)
            .where(and(
                eq(collections.userId, userId),
                eq(collections.collectionId, collectionId)
            )).get();
        return this.fromDrizzleModel(CollectionModel, result);
    }

    async save(collection: CollectionModel) {
        await this.db
            .insert(collections)
            .values(collection.toPlainObject())
            .onConflictDoUpdate({
                target: collections.collectionId,
                set: collection.toPlainObject(),
            });
    }
}
