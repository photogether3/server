import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { DiscordColors, DiscordWebHookService } from 'src/shared/third-party';

import { CategoryService } from './category-core/category.service';
import { CategoryResultDTO, CreateCategoryDTO } from './category.dto';

@Injectable()
export class CategoryFacade {

    constructor(
        private readonly discordWebHook: DiscordWebHookService,
        private readonly categoryCoreService: CategoryService,
    ) {
    }

    async getCategories() {
        const results = await this.categoryCoreService.getCategories();
        return plainToInstance(CategoryResultDTO, results);
    }

    async getFavorites(userId: string) {
        return Promise.resolve(undefined);
    }

    async create(dto: CreateCategoryDTO) {
        await this.categoryCoreService.create(dto.name);
        await this.discordWebHook.sendMessage(`새로운 카테고리 [${dto.name}](이)가 생성되었어요 😊`, DiscordColors.SUCCESS);
    }
}
