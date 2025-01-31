import { Injectable } from '@nestjs/common';

import { DrizzleService } from 'src/shared/database';

import { CategoryService, CreateOrUpdateFavoriteBodyDto, FavoriteService } from '../../app';

@Injectable()
export class FavoriteFacade {

    constructor(
        private readonly drizzleService: DrizzleService,
        private readonly categoryService: CategoryService,
        private readonly favoriteService: FavoriteService,
    ) {
    }

    async getFavoriteCategories(userId: string) {
        return await this.categoryService.getCategoriesByUserId(userId);
    }

    async createOrUpdate(userId: string, body: CreateOrUpdateFavoriteBodyDto) {
        return this.drizzleService.runInTx(async () => {
            const { categoriesIds } = body;
            await this.categoryService.verifyCategories(categoriesIds);
            return this.favoriteService.createOrUpdate(userId, categoriesIds);
        });
    }
}
