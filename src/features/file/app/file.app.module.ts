import { Module } from '@nestjs/common';

import { FileCoreModule } from '../core';
import { FileManager } from './file.manager';

/**
 * @desc 예외로 다른 도메인/app 모듈에서 참조가 가능한 모듈입니다.
 */
@Module({
    imports: [FileCoreModule],
    providers: [FileManager],
    exports: [FileManager],
})
export class FileAppModule {
}
