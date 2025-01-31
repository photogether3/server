import { Module } from '@nestjs/common';

import { CategoryModule } from '../app';
import { CategoryController } from './controllers/category.controller';
import { FavoriteController } from './controllers/favorite.controller';
import { CategoryFacade } from './facades/category.facade';
import { FavoriteFacade } from './facades/favorite.facade';

@Module({
    imports: [
        CategoryModule,
    ],
    controllers: [
        CategoryController,
        FavoriteController,
    ],
    providers: [
        CategoryFacade,
        FavoriteFacade
    ]
})
export class CategoryApiModule {
}
