import { Module } from '@nestjs/common';

import { FavoriteCoreModule } from '../favorite/public-api';

import { CollectionController } from './collection.controller';
import { CollectionFacade } from './collection.facade';
import { CollectionCoreModule } from './collection-core/collection-core.module';

@Module({
    imports: [CollectionCoreModule, FavoriteCoreModule],
    controllers: [CollectionController],
    providers: [CollectionFacade],
})
export class CollectionModule {
}
