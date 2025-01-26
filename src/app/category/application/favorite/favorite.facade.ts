import { Injectable } from '@nestjs/common';

import { DrizzleService } from 'src/shared/database';

import { CategoryService, CreateOrUpdateFavoriteDTO, FavoriteService } from '../../domain';

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

    async createOrUpdate(userId: string, dto: CreateOrUpdateFavoriteDTO) {
        return this.drizzleService.runInTx(async () => {
            const { categoriesIds } = dto;
            await this.categoryService.verifyCategories(categoriesIds);
            return this.favoriteService.createOrUpdate(userId, categoriesIds);
        });
    }
}
