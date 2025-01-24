import { Module } from '@nestjs/common';

import { CategoryController } from './category.controller';
import { CategoryDomainModule } from '../domain';
import { CategoryFacade } from './category.facade';
import { FavoriteController } from './favorite/favorite.controller';
import { FavoriteFacade } from './favorite/favorite.facade';

@Module({
    imports: [
        CategoryDomainModule,
    ],
    controllers: [
        CategoryController,
        FavoriteController,
    ],
    providers: [
        CategoryFacade,
        FavoriteFacade,
    ],
})
export class CategoryAppModule {
}
