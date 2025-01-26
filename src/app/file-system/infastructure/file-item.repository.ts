import { Injectable } from '@nestjs/common';

import { DrizzleRepository, fileItems } from 'src/shared/database';

import { FileItemModel } from '../domain';

@Injectable()
export class FileItemRepository extends DrizzleRepository {

    async saves(_fileItems: FileItemModel[]) {
        await this.db
            .insert(fileItems)
            .values(_fileItems.map(x => x.toPlainObject()))
            .catch((err) => {
                throw new IntersectionObserver(err);
            });
    }
}
