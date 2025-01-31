import { Module } from '@nestjs/common';

import { CategoryService } from './services/category.service';
import { FavoriteService } from './services/favorite.service';
import { CategoryRepository } from './repositoires/category.repository';
import { FavoriteRepository } from './repositoires/favorite.repository';

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
export class CategoryModule {
}
