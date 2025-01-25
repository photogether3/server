import { Injectable } from '@nestjs/common';

import { FavoriteService } from '../../category/domain';

import {
    CollectionService,
    CreateCollectionDTO,
    CreateCollectionParam,
    GetCollectionsOptionDTO,
    UpdateCollectionDTO,
} from '../domain';

@Injectable()
export class CollectionFacade {

    constructor(
        private readonly favoriteService: FavoriteService,
        private readonly collectionService: CollectionService,
    ) {
    }

    async getCollections(userId: string, dto: GetCollectionsOptionDTO) {
        return this.collectionService.getCollections(userId, dto);
    }

    async create(userId: string, dto: CreateCollectionDTO) {
        await this.favoriteService.getFavorite(userId, dto.categoryId);
        const param: CreateCollectionParam = { userId, ...dto };
        await this.collectionService.create(param);
    }

    async update(userId: string, collectionId: string, dto: UpdateCollectionDTO) {
        const collection = await this.collectionService.getCollection(userId, collectionId);
        await this.favoriteService.getFavorite(userId, dto.categoryId);
        await this.collectionService.update(collection, dto);
    }
}
