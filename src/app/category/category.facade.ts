import { Injectable } from '@nestjs/common';

import { DiscordColors, DiscordWebHookService } from 'src/shared/third-party';

import { CategoryService } from './category-core/category.service';
import { CategoryResultDTO, CreateCategoryDTO } from './category.dto';

@Injectable()
export class CategoryFacade {

    constructor(
        private readonly discordWebHook: DiscordWebHookService,
        private readonly categoryService: CategoryService,
    ) {
    }

    async getCategories() {
        const results = await this.categoryService.getCategories();

        return results.map(x => ({
            categoryId: x.categoryId,
            name: x.name,
        } as CategoryResultDTO));
    }

    async getFavorites(userId: string) {
        return await this.categoryService.getFavoriteCategories(userId);
    }

    async create(dto: CreateCategoryDTO) {
        await this.categoryService.create(dto.name);
        await this.discordWebHook.sendMessage(`새로운 카테고리 [${dto.name}](이)가 생성되었어요 😊`, DiscordColors.SUCCESS);
    }
}
