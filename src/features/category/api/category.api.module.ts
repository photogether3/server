import { Module } from '@nestjs/common';

import { CategoryAppModule } from '../app';
import { CategoryController } from './category.controller';
import { FavoriteController } from './favorite.controller';

@Module({
    imports: [
        CategoryAppModule,
    ],
    controllers: [
        CategoryController,
        FavoriteController,
    ],
})
export class CategoryApiModule {
}
