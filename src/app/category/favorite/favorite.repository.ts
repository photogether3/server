import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { DrizzleService, favorites } from 'src/shared/database';

import { FavoriteModel } from './favorite.model';

@Injectable()
export class FavoriteRepository {

    constructor(
        private readonly drizzleService: DrizzleService,
    ) {
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
