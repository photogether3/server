import { Module } from '@nestjs/common';

import { CollectionController } from './collection.controller';
import { CollectionAppModule } from '../app';

@Module({
    imports: [CollectionAppModule],
    controllers: [CollectionController],
})
export class CollectionApiModule {
}
