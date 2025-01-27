import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';

import { DrizzleRepository, fileGroups } from 'src/shared/database';

import { FileGroupModel } from '../domain';

@Injectable()
export class FileGroupRepository extends DrizzleRepository {

    async findFileGroup(userId: string, fileGroupId: string) {
        const result = await this.db
            .select()
            .from(fileGroups)
            .where(and(
                eq(fileGroups.userId, userId),
                eq(fileGroups.fileGroupId, fileGroupId),
            ))
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
