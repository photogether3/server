import { Injectable } from '@nestjs/common';
import { and, eq, sql } from 'drizzle-orm';

import { collections, DrizzleService } from 'src/shared/database';

import { CollectionPaginationDTO, CollectionResultDTO, FindCollectionsOptionDTO } from './dto';
import { CollectionModel } from '../domain';

@Injectable()
export class CollectionRepository {

    constructor(
        private readonly drizzleService: DrizzleService,
    ) {
    }

    /**
     * @warning 다른 도메인 모듈의 테이블을 참조합니다.
     */
    async findPagedCollections(dto: FindCollectionsOptionDTO) {
        const { userId, perPage, page, offset, sortOrder, sortBy } = dto;

        // @formatter:off
        const result = await this.drizzleService.db.run(sql`
            SELECT COUNT(*) OVER (PARTITION BY c.user_id) AS total_count, c.*
            FROM collections c
            WHERE c.user_id = ${userId}
            ORDER BY c.${sql.raw(sortBy)} ${sql.raw(sortOrder)}
            LIMIT ${perPage}
            OFFSET ${offset}
        `);

        const totalItemCount = result.rows[0].total_count;
        const totalPageCount = Math.ceil(totalItemCount / perPage);
        const items = result.rows.map(x => ({
            collectionId: x.collection_id,
            imageUrls: [],
            title: x.title,
            totalItemCount: 0,
        } as CollectionResultDTO));

        return {
            totalPageCount,
            totalItemCount,
            currentPage: page,
            perPage,
            items,
        } as CollectionPaginationDTO;
    }

    async findCollection(userId:string, collectionId:string) {
        const result = await this.drizzleService.db
            .select()
            .from(collections)
            .where(and(
                eq(collections.userId, userId),
                eq(collections.collectionId, collectionId)
            ))
            .get();
        if (!result) return null;
        return CollectionModel.fromDrizzleModel(result);
    }

    async save(collection: CollectionModel) {
        await this.drizzleService.db
            .insert(collections)
            .values(collection.toPlainObject())
            .onConflictDoUpdate({
                target: collections.collectionId,
                set: collection.toPlainObject(),
            });
    }
}
