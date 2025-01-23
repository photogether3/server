import { Module } from '@nestjs/common';

import { FavoriteModule } from '../category/public-api';

import { CollectionController } from './collection.controller';
import { CollectionFacade } from './collection.facade';
import { CollectionCoreModule } from './collection-core/collection-core.module';

@Module({
    imports: [CollectionCoreModule, FavoriteModule],
    controllers: [CollectionController],
    providers: [CollectionFacade],
})
export class CollectionModule {
}
