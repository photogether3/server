import { Injectable } from '@nestjs/common';

import { RequestScopes } from 'src/shared/base';

import { FavoriteResultDTO, GetFavoritesDTO } from './favorite.dto';
import { FavoriteCoreService } from './favorite-core/favorite-core.service';

@Injectable()
export class FavoriteFacade {

    constructor(
        private readonly favoriteCoreService: FavoriteCoreService,
    ) {
    }

    async getFavorites(userId: string, dto: GetFavoritesDTO) {
        const favoriteQueries = {
            [RequestScopes.USER]: () => this.favoriteCoreService.getUserFavorites(userId),
            [RequestScopes.ALL]: () => this.favoriteCoreService.getSystemFavorites(),
        };
        const results = await favoriteQueries[dto.scope]();

        return results.map(x => ({
            favoriteId: x.favoriteId,
            name: x.name,
        } as FavoriteResultDTO));
    }
}
