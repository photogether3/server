import { Injectable } from '@nestjs/common';

import { FavoriteService } from '../../category/domain';

import { CreateCollectionBodyDto, GetCollectionsQueryDto, UpdateCollectionBodyDto } from './request-dto';
import { CollectionService, CreateCollectionDto, GetCollectionsOptionDto, UpdateCollectionDto } from '../domain';

@Injectable()
export class CollectionFacade {

    constructor(
        private readonly favoriteService: FavoriteService,
        private readonly collectionService: CollectionService,
    ) {
    }

    async getCollections(userId: string, body: GetCollectionsQueryDto) {
        const { page, perPage } = body;
        const offset = (page - 1) * perPage;
        const dto: GetCollectionsOptionDto = { ...body, userId, offset };
        return this.collectionService.getCollections(dto);
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
