import { Injectable } from '@nestjs/common';

import {
    CollectionService,
    CreateCollectionDto,
    ReqCreateCollectionDto,
    ReqGetCollectionsDto,
    ReqUpdateCollectionDto,
    UpdateCollectionDto,
} from 'src/features/collection/app';
import { FavoriteService } from 'src/features/category/app';

@Injectable()
export class CollectionFacade {

    constructor(
        private readonly favoriteService: FavoriteService,
        private readonly collectionService: CollectionService,
    ) {
    }

    async getCollections(userId: string, dto: ReqGetCollectionsDto) {
        return this.collectionService.getCollections(userId, dto);
    }

    async create(userId: string, dto: ReqCreateCollectionDto) {
        await this.favoriteService.getFavorite(userId, dto.categoryId);
        const param: CreateCollectionDto = { userId, ...dto };
        await this.collectionService.create(param);
    }

    async update(userId: string, collectionId: string, _dto: ReqUpdateCollectionDto) {
        const collection = await this.collectionService.getCollection(userId, collectionId);
        await this.favoriteService.getFavorite(userId, _dto.categoryId);

        const dto: UpdateCollectionDto = { ..._dto };
        await this.collectionService.update(collection, dto);
    }
}
