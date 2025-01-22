import { Module } from '@nestjs/common';

import { FavoriteController } from './favorite.controller';
import { FavoriteFacade } from './favorite.facade';
import { FavoriteCoreModule } from './favorite-core/favorite-core.module';

@Module({
    imports: [FavoriteCoreModule],
    controllers: [
        FavoriteController,
    ],
    providers: [FavoriteFacade],
})
export class FavoriteModule {
}
