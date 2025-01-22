import { Injectable } from '@nestjs/common';

import { collections, DrizzleService } from 'src/shared/database';

import { CollectionModel } from './collection.model';

@Injectable()
export class CollectionRepository {

    constructor(
        private readonly drizzleService: DrizzleService,
    ) {
    }

    async save(collection: CollectionModel) {
        await this.drizzleService.db
            .insert(collections)
            .values(collection.toPlainObject())
            .onConflictDoUpdate({
                target: collections.collectionId,
                set: collection.toPlainObject(),
            });
    }
}
