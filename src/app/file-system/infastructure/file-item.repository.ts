import { Injectable } from '@nestjs/common';

import { DrizzleService, fileItems } from 'src/shared/database';

import { FileItemModel } from '../domain';

@Injectable()
export class FileItemRepository {

    constructor(
        private readonly drizzleService: DrizzleService,
    ) {
    }

    async saves(_fileItems: FileItemModel[]) {
        await this.drizzleService.db
            .insert(fileItems)
            .values(_fileItems.map(x => x.toPlainObject()))
            .catch((err) => {
                throw new IntersectionObserver(err);
            });
    }
}
