import { Module } from '@nestjs/common';

import { FileService } from './file.service';
import { FileGroupRepository, FileItemRepository } from '../infra';

@Module({
    providers: [
        FileGroupRepository,
        FileItemRepository,
        FileService,
    ],
    exports: [
        FileService,
    ],
})
export class FileCoreModule {
}
