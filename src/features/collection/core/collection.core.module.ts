import { Module } from '@nestjs/common';

import { CollectionRepository } from '../infra';
import { CollectionService } from './collection.service';

@Module({
    providers: [
        CollectionService,
        CollectionRepository,
    ],
    exports: [CollectionService],
})
export class CollectionCoreModule {
}
