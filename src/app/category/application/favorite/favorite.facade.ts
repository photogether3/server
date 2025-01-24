import { Injectable } from '@nestjs/common';

import { CategoryService, CreateOrUpdateFavoriteDTO, FavoriteService } from '../../domain';

@Injectable()
export class FavoriteFacade {

    constructor(
        private readonly categoryService: CategoryService,
        private readonly favoriteService: FavoriteService,
    ) {
    }

    async getFavoriteCategories(userId: string) {
        return await this.categoryService.getCategoriesByUserId(userId);
    }

    async createOrUpdate(userId: string, dto: CreateOrUpdateFavoriteDTO) {
        const { categoriesIds } = dto;
        return this.favoriteService.creates(userId, categoriesIds);
    }
}
