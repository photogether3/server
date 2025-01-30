import { Injectable } from '@nestjs/common';
import { and, eq, sql } from 'drizzle-orm';

import { collections, collectionViews, DrizzleRepository } from 'src/shared/database';
import { PaginationUtil } from 'src/shared/base';

import { CollectionModel, CollectionPaginationDto, GetCollectionsQueryDto } from '../core';
import { CollectionViewModel } from '../core/collection.view-model';

@Injectable()
export class CollectionRepository extends DrizzleRepository {

    /**
     * @warning 다른 도메인 모듈의 테이블을 참조합니다.
     */
    async findPagedCollections(userId: string, dto: GetCollectionsQueryDto) {
        const { perPage, page, sortOrder, sortBy } = dto;

        const paginationUtil = new PaginationUtil(page, perPage);

        // @formatter:off
        const results = await this.db
            .select()
            .from(collectionViews)
            .where(eq(collectionViews.userId, userId))
            // @formatter:off
            .orderBy(sql`${sql.raw(sortBy)} ${sql.raw(sortOrder)}`)
            .limit(perPage)
            .offset(paginationUtil.offset);

        if (results.length === 0) {
            return CollectionPaginationDto.fromNullData();
        }

        console.log(results);

        // const items = results.map(x => ({
        //     collectionId: x.collectionId,
        //     imageUrls: [],
        //     title: x.title,
        //     totalItemCount: 0,
        // } as CollectionResultDto));
        const items = results.map(x =>
            CollectionViewModel.fromPersistence(x)
        );
        const totalItemCount = results[0].totalCount;
        return paginationUtil.generate<CollectionViewModel>(totalItemCount, items);
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
