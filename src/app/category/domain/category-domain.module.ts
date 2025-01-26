import { Module } from '@nestjs/common';

import { CategoryService } from './category.service';
import { FavoriteService } from './favorite/favorite.service';
import { CategoryRepository, FavoriteRepository } from '../infrastructure';

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
