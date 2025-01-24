import { Module } from '@nestjs/common';

import { CategoryService } from './category.service';
import { FavoriteService } from './favorite/favorite.service';
import { FavoriteRepository } from './favorite/favorite.repository';
import { CategoryRepository } from './category.repository';

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
export class CategoryDomainModule {
}
