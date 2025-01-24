import { Module } from '@nestjs/common';

import { CollectionController } from './collection.controller';
import { CollectionFacade } from './collection.facade';
import { CollectionDomainModule } from '../domain';

@Module({
    imports: [CollectionDomainModule],
    controllers: [CollectionController],
    providers: [CollectionFacade],
})
export class CollectionModule {
}
