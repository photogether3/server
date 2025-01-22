import { Injectable } from '@nestjs/common';

import { FavoriteCoreService } from '../favorite/public-api';

import { CreateCollectionDTO } from './collection.dto';
import { CollectionCoreService } from './collection-core/collection-core.service';
import { CreateCollectionParam } from './collection-core/collection.model';

@Injectable()
export class CollectionFacade {

    constructor(
        private readonly favoriteCoreService: FavoriteCoreService,
        private readonly collectionCoreService: CollectionCoreService,
    ) {
    }

    async create(userId: string, dto: CreateCollectionDTO) {
        await this.favoriteCoreService.getFavoriteOrThrow(dto.favoriteId);

        const param: CreateCollectionParam = { userId, ...dto };
        await this.collectionCoreService.create(param);
    }
}
