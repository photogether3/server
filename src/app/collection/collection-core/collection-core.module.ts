import { Module } from '@nestjs/common';

import { CollectionCoreService } from './collection-core.service';
import { CollectionRepository } from './collection.repository';

@Module({
    providers: [CollectionCoreService, CollectionRepository],
    exports: [CollectionCoreService],
})
export class CollectionCoreModule {
}
