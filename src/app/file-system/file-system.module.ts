import { Module } from '@nestjs/common';

import { FileSystemController } from './file-system.controller';

@Module({
    controllers: [
        FileSystemController,
    ],
})
export class FileSystemModule {
}
