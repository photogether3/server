import { Module } from '@nestjs/common';

import { FavoriteService } from './favorite.service';
import { FavoriteRepository } from './favorite.repository';

@Module({
    imports: [],
    providers: [FavoriteService, FavoriteRepository],
    exports: [FavoriteService],
})
export class FavoriteModule {
}
