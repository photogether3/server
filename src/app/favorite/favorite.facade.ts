import { Injectable } from '@nestjs/common';

import { FavoriteCoreService } from './favorite-core/favorite-core.service';

@Injectable()
export class FavoriteFacade {

    constructor(
        private readonly favoriteCoreService: FavoriteCoreService,
    ) {
    }

    async getFavorites(userId: string) {

    }
}
