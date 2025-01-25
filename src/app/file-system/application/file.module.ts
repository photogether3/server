import { Module } from '@nestjs/common';

import { FileController } from './file.controller';
import { FileFacade } from './file.facade';
import { FileDomainModule } from '../domain';

@Module({
    imports: [
        FileDomainModule,
    ],
    controllers: [
        FileController,
    ],
    providers: [
        FileFacade,
    ],
})
export class FileModule {
}
