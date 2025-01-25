import { Module } from '@nestjs/common';

import { FileService } from './file.service';
import { FileGroupRepository, FileItemRepository } from '../infastructure';

@Module({
    imports: [],
    providers: [
        FileGroupRepository,
        FileItemRepository,
        FileService,
    ],
    exports: [FileService],
})
export class FileDomainModule {
}
