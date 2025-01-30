import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DrizzleRepository, fileGroups } from 'src/shared/database';

import { FileGroupModel } from '../core';

@Injectable()
export class FileGroupRepository extends DrizzleRepository {

    async findFileGroup(fileGroupId: string) {
        const result = await this.db
            .select()
            .from(fileGroups)
            .where(eq(fileGroups.fileGroupId, fileGroupId))
            .get();
        if (!result) return null;

        return this.fromDrizzleModel(FileGroupModel, result);
    }

    async save(fileGroup: FileGroupModel) {
        await this.db
            .insert(fileGroups)
            .values(fileGroup.toPlainObject())
            .onConflictDoUpdate({
                target: fileGroups.fileGroupId,
                set: fileGroup.toPlainObject(),
            })
            .catch((err) => {
                throw new IntersectionObserver(err);
            });
    }

}
