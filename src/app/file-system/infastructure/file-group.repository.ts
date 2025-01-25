import { Injectable } from '@nestjs/common';

import { FileGroupModel } from '../domain';
import { DrizzleService, fileGroups } from 'src/shared/database';

@Injectable()
export class FileGroupRepository {

    constructor(
        private readonly drizzleService: DrizzleService,
    ) {
    }

    async save(fileGroup: FileGroupModel) {
        await this.drizzleService.db
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
