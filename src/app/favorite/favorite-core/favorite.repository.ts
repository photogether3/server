import { Injectable } from '@nestjs/common';

import { DrizzleService, favorites, userFavorites } from 'src/shared/database';
import { and, eq, isNull } from 'drizzle-orm';
import { FavoriteModel } from './favorite.model';

@Injectable()
export class FavoriteRepository {

    constructor(
        private readonly drizzleService: DrizzleService,
    ) {
    }

    async findFavoriteById(userId: string, favoriteId: string) {
        const results = await this.drizzleService
            .db
            .select()
            .from(favorites)
            .innerJoin(
                userFavorites,
                and(
                    eq(favorites.favoriteId, favoriteId),
                    eq(userFavorites.userId, userId),
                    isNull(userFavorites.deletedAt),
                ),
            )
            .where(isNull(favorites.deletedAt))
            .limit(1);
        if (results.length === 0) return null;

        return FavoriteModel.fromDrizzleModel(results?.shift());
    }
}
