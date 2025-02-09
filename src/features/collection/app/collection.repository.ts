import { Inject, Injectable } from '@nestjs/common';
import { and, eq, sql } from 'drizzle-orm';
import { LibSQLDatabase } from 'drizzle-orm/libsql';

import { collections, collectionViews, DRIZZLE_ORM_TOKEN, DrizzleRepository } from 'src/shared/database';
import { EnvService } from 'src/shared/env';

import { ReqGetCollectionsDto } from './dto';
import { CollectionModel } from './models/collection.model';
import { CollectionViewModel } from './models/collection.view-model';
import { CollectionDetailViewModel } from './models/collection-detail.view-model';

@Injectable()
export class CollectionRepository extends DrizzleRepository {

    private readonly publicUrl: string;

    constructor(
        @Inject(DRIZZLE_ORM_TOKEN)
        protected readonly _db: LibSQLDatabase,
        private readonly envService: EnvService
    ) {
        super(_db);
        this.publicUrl = this.envService.getFirebaseEnv().storageUrl;
    }

    /**
     * @warning 다른 도메인 모듈의 테이블을 참조합니다.
     */
    async findPagedCollectionViews(userId: string, dto: ReqGetCollectionsDto) {
        const { perPage, page, sortOrder, sortBy } = dto;

        const qb = this.db
            .select()
            .from(collectionViews)
            .where(eq(collectionViews.userId, userId))
            .orderBy(sql`${sql.raw(sortBy)} ${sql.raw(sortOrder)}`)
            .$dynamic();

        return await this.withPagination<CollectionViewModel>(qb, page, perPage, (results) =>
            results.map(x => CollectionViewModel.fromPersistence(x, this.publicUrl))
        );
    }

    /**
     * @warning 다른 도메인 모듈의 테이블을 참조합니다.
     */
    async findCollectionView(userId: string, collectionId: string) {
        const result = await this.db
            .select()
            .from(collectionViews)
            .where(and(
                eq(collectionViews.userId, userId),
                eq(collectionViews.collectionId, collectionId)
            ))
            .get();
        if (!result) return null;
        return CollectionDetailViewModel.fromPersistence(result);
    }

    async findCollection(userId: string, collectionId: string) {
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
