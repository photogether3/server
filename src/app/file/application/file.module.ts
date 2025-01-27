import { Module } from '@nestjs/common';

import { FileManager } from './file.manager';
import { FileDomainModule } from '../domain';

@Module({
    imports: [FileDomainModule],
    providers: [FileManager],
    exports: [FileManager],
})
export class FileModule {
}
