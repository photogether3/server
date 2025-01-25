import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { and, eq, or } from 'drizzle-orm';

import { DrizzleService, favorites } from 'src/shared/database';

import { FavoriteModel } from './favorite.model';

@Injectable()
export class FavoriteRepository {

    async;

    constructor(
        private readonly drizzleService: DrizzleService,
    ) {
    }

    async findFavoritesByUserId(userId: string) {
        const results = await this.drizzleService.db
            .select()
            .from(favorites)
            .where(eq(favorites.userId, userId));

        return results.map(x => FavoriteModel.fromDrizzleModel(x));
    }

    async findFavoritesByUserIdWithCategoryId(userId: string, favoriteId: string) {
        const results = await this.drizzleService.db
            .select()
            .from(favorites)
            .where(and(
                eq(favorites.userId, userId),
                eq(favorites.categoryId, favoriteId),
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

    async removes(_favorites: FavoriteModel[]) {
        const conditions = _favorites.map((fav) =>
            and(
                eq(favorites.userId, fav.userId),
                eq(favorites.categoryId, fav.categoryId),
            ),
        );

        await this.drizzleService.db
            .delete(favorites)
            .where(or(...conditions));
    }
}
