import { Injectable } from '@nestjs/common';

import { FavoriteService } from '../../category/core';

import {
    CollectionService,
    CreateCollectionBodyDto,
    CreateCollectionDto,
    GetCollectionsQueryDto,
    UpdateCollectionBodyDto,
    UpdateCollectionDto,
} from '../core';

@Injectable()
export class CollectionFacade {

    constructor(
        private readonly favoriteService: FavoriteService,
        private readonly collectionService: CollectionService,
    ) {
    }

    async getCollections(userId: string, body: GetCollectionsQueryDto) {
        return this.collectionService.getCollections(userId, body);
    }

    async create(userId: string, body: CreateCollectionBodyDto) {
        await this.favoriteService.getFavorite(userId, body.categoryId);
        const param: CreateCollectionDto = { userId, ...body };
        await this.collectionService.create(param);
    }

    async update(userId: string, collectionId: string, body: UpdateCollectionBodyDto) {
        const collection = await this.collectionService.getCollection(userId, collectionId);
        await this.favoriteService.getFavorite(userId, body.categoryId);

        const dto: UpdateCollectionDto = { ...body };
        await this.collectionService.update(collection, dto);
    }
}
