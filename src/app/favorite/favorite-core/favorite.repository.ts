import { Injectable } from '@nestjs/common';

import { DrizzleService, favorites } from 'src/shared/database';
import { and, eq, isNull } from 'drizzle-orm';
import { FavoriteModel } from './favorite.model';

@Injectable()
export class FavoriteRepository {

    constructor(
        private readonly drizzleService: DrizzleService,
    ) {
    }

    async findFavoriteById(favoriteId: string) {
        const results = await this.drizzleService
            .db
            .select()
            .from(favorites)
            .where(
                and(
                    eq(favorites.favoriteId, favoriteId),
                    isNull(favorites.deletedAt),
                ),
            )
            .limit(1);
        if (results.length === 0) return null;

        return FavoriteModel.fromDrizzleModel(results?.shift());
    }
}
