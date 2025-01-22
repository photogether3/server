import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { and, eq, isNull } from 'drizzle-orm';

import { DrizzleService, favorites } from 'src/shared/database';

import { FavoriteModel } from './favorite.model';

@Injectable()
export class FavoriteRepository {

    constructor(
        private readonly drizzleService: DrizzleService,
    ) {
    }

    async findFavorites(userId: string) {
        const results = await this.drizzleService
            .db
            .select()
            .from(favorites)
            .where(
                and(
                    eq(favorites.userId, userId),
                    isNull(favorites.deletedAt),
                ),
            );

        return results.map(x => FavoriteModel.fromDrizzleModel(x));
    }

    async findFavorite(userId: string, favoriteId: string) {
        const results = await this.drizzleService
            .db
            .select()
            .from(favorites)
            .innerJoin(
                favorites,
                and(
                    eq(favorites.favoriteId, favoriteId),
                    eq(favorites.userId, userId),
                    isNull(favorites.deletedAt),
                ),
            )
            .where(isNull(favorites.deletedAt))
            .limit(1);

        if (results.length === 0) return null;

        return FavoriteModel.fromDrizzleModel(results?.shift());
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
