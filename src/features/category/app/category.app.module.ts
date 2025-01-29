import { Module } from '@nestjs/common';

import { CategoryCoreModule } from '../core';
import { CategoryFacade } from './usecases/category.facade';
import { FavoriteFacade } from './usecases/favorite.facade';

@Module({
    imports: [
        CategoryCoreModule,
    ],
    providers: [
        CategoryFacade,
        FavoriteFacade,
    ],
    exports: [
        CategoryFacade,
        FavoriteFacade,
    ],
})
export class CategoryAppModule {
}
