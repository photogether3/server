import { Module } from '@nestjs/common';

import { CategoryRepository, FavoriteRepository } from '../infra';
import { CategoryService } from './services/category.service';
import { FavoriteService } from './services/favorite.service';

@Module({
    providers: [
        CategoryRepository,
        FavoriteRepository,
        CategoryService,
        FavoriteService,
    ],
    exports: [
        CategoryService,
        FavoriteService,
    ],
})
export class CategoryCoreModule {
}
