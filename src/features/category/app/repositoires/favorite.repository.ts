import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { and, eq, or } from 'drizzle-orm';

import { DrizzleRepository, favorites } from 'src/shared/database';
import { FavoriteModel } from '../models/favorite.model';

@Injectable()
export class FavoriteRepository extends DrizzleRepository {

    async findFavoritesByUserId(userId: string) {
        const results = await this.db
            .select()
            .from(favorites)
            .where(eq(favorites.userId, userId));

        return results.map(x =>
            this.fromDrizzleModel(FavoriteModel, x),
        );
    }

    async findFavoritesByUserIdWithCategoryId(userId: string, favoriteId: string) {
        const result = await this.db
            .select()
            .from(favorites)
            .where(and(
                eq(favorites.userId, userId),
                eq(favorites.categoryId, favoriteId),
            )).get();
        return this.fromDrizzleModel(FavoriteModel, result);
    }

    async saves(_favorites: FavoriteModel[]) {
        await this.db
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

        await this.db
            .delete(favorites)
            .where(or(...conditions));
    }
}
