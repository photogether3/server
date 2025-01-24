import { Injectable } from '@nestjs/common';

import { CreateCollectionDTO } from './collection.dto';
import { CollectionCoreService } from './collection-core/collection-core.service';
import { CreateCollectionParam } from './collection-core/collection.model';

@Injectable()
export class CollectionFacade {

    constructor(
        private readonly collectionCoreService: CollectionCoreService,
    ) {
    }

    async create(userId: string, dto: CreateCollectionDTO) {
        // await this.favoriteService.getFavoriteOrThrow(userId, dto.favoriteId);

        const param: CreateCollectionParam = { userId, ...dto };
        await this.collectionCoreService.create(param);
    }
}
