import { Module } from '@nestjs/common';

import { FileService } from './file.service';
import { FileManager } from './file.manager';
import { FileGroupRepository, FileItemRepository } from '../infastructure';

@Module({
    imports: [],
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
export class FileDomainModule {
}
