import { Module } from '@nestjs/common';

import { CategoryModule } from 'src/features/category/app';

import { CollectionModule } from '../app';
import { CollectionController } from './collection.controller';
import { CollectionFacade } from './collection.facade';

@Module({
    imports: [
        CategoryModule,
        CollectionModule
    ],
    controllers: [CollectionController],
    providers: [CollectionFacade]
})
export class CollectionApiModule {
}
