import { Module } from '@nestjs/common';

import { CategoryDomainModule } from '../../category/domain';

import { CollectionController } from './collection.controller';
import { CollectionFacade } from './collection.facade';
import { CollectionDomainModule } from '../domain';

@Module({
    imports: [
        CollectionDomainModule,
        CategoryDomainModule,
    ],
    controllers: [CollectionController],
    providers: [CollectionFacade],
})
export class CollectionModule {
}
