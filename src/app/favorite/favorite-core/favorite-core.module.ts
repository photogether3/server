import { Module } from '@nestjs/common';

import { FavoriteCoreService } from './favorite-core.service';
import { FavoriteRepository } from './favorite.repository';

@Module({
    providers: [FavoriteCoreService, FavoriteRepository],
    exports: [FavoriteCoreService],
})
export class FavoriteCoreModule {
}
