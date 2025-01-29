import { Module } from '@nestjs/common';

import { CategoryCoreModule } from '../../category/core';

import { CollectionCoreModule } from '../core';
import { CollectionFacade } from './collection.facade';

@Module({
    imports: [
        CollectionCoreModule,
        CategoryCoreModule,
    ],
    providers: [CollectionFacade],
    exports: [CollectionFacade],
})
export class CollectionAppModule {
}
