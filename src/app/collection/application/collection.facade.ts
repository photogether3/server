import { Injectable } from '@nestjs/common';

import { CollectionService, CreateCollectionDTO, CreateCollectionParam } from '../domain';

@Injectable()
export class CollectionFacade {

    constructor(
        private readonly collectionService: CollectionService,
    ) {
    }

    async create(userId: string, dto: CreateCollectionDTO) {
        // await this.favoriteService.getFavoriteOrThrow(userId, dto.favoriteId);
        const param: CreateCollectionParam = { userId, ...dto };
        await this.collectionService.create(param);
    }
}
