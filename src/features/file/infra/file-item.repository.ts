import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';

import { DrizzleRepository, fileItems } from 'src/shared/database';

import { FileItemModel } from '../core';

@Injectable()
export class FileItemRepository extends DrizzleRepository {

    async findFileItem(userId: string, fileGroupId: string) {
        const result = await this.db
            .select()
            .from(fileItems)
            .where(and(
                eq(fileItems.userId, userId),
                eq(fileItems.fileGroupId, fileGroupId),
            )).get();
        return this.fromDrizzleModel(FileItemModel, result);
    }

    async save(fileItem: FileItemModel) {
        await this.db
            .insert(fileItems)
            .values(fileItem.toPlainObject())
            .catch((err) => {
                throw new IntersectionObserver(err);
            });
    }

    async saves(_fileItems: FileItemModel[]) {
        await this.db
            .insert(fileItems)
            .values(_fileItems.map(x => x.toPlainObject()))
            .catch((err) => {
                throw new IntersectionObserver(err);
            });
    }

}
