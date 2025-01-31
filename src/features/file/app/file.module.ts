import { Module } from '@nestjs/common';

import { FileService } from './file.service';
import { FileGroupRepository } from './repositories/file-group.repository';
import { FileItemRepository } from './repositories/file-item.repository';
import { FileManager } from './file.manager';

@Module({
    providers: [
        FileGroupRepository,
        FileItemRepository,
        FileService,
        FileManager,
    ],
    exports: [
        FileService,
        FileManager,
    ],
})
export class FileModule {
}
