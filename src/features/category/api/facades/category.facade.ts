import { Injectable } from '@nestjs/common';

import { DiscordColors, DiscordWebHookService } from 'src/shared/third-party';

import { CategoryService, ReqCreateCategoryDto } from 'src/features/category/app';

@Injectable()
export class CategoryFacade {

    constructor(
        private readonly discordWebHook: DiscordWebHookService,
        private readonly categoryService: CategoryService,
    ) {
    }

    async getCategories() {
        return await this.categoryService.getCategoryResults();
    }

    async getCategoryWithFavoriteStatus(userId: string) {
        return await this.categoryService.getCategoriesWithFavoriteStatus(userId);
    }

    async create(dto: ReqCreateCategoryDto) {
        await this.categoryService.create(dto.categoryId, dto.name);
        await this.discordWebHook.sendMessage(`새로운 카테고리 [${dto.name}](이)가 생성되었어요 😊`, DiscordColors.SUCCESS);
    }

    async remove(categoryId: string) {
        const category = await this.categoryService.getCategoryById(categoryId);
        await this.categoryService.remove(category);
        await this.discordWebHook.sendMessage(`카테고리 [${category.name}](이)가 삭제되었어요 😢`, DiscordColors.WARNING);
    }
}
