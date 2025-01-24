import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';

import { DrizzleService, favorites } from 'src/shared/database';

import { FavoriteModel } from './favorite.model';

@Injectable()
export class FavoriteRepository {

    constructor(
        private readonly drizzleService: DrizzleService,
    ) {
    }

    async findFavorite(userId: string, favoriteId: string) {
        const results = await this.drizzleService.db
            .select()
            .from(favorites)
            .where(and(
                eq(favorites.userId, userId),
                eq(favorites.favoriteId, favoriteId),
            ));
        if (results.length === 0) return null;

        return FavoriteModel.fromDrizzleModel(results.shift());
    }

    async saves(_favorites: FavoriteModel[]) {
        await this.drizzleService.db
            .insert(favorites)
            .values(
                _favorites.map(favorite => favorite.toPlainObject()),
            )
            .catch(err => {
                throw new InternalServerErrorException(err);
            });
    }
}
