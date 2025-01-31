import { plainToInstance } from 'class-transformer';

import { OrmModel } from 'src/shared/database';

import { CreateFileDto } from '../dto';

export class FileItemModel extends OrmModel {
    readonly fileGroupId: string;
    readonly rank: number;
    readonly filePath: string;
    readonly fileName: string;
    readonly originalFileName: string;
    readonly mimeType: string;

    static from(fileGroupId: string, dto: CreateFileDto) {
        const now = new Date();
        return plainToInstance(FileItemModel, {
            fileGroupId,
            rank: dto.rank,
            filePath: dto.filePath,
            fileName: dto.fileName,
            originalFileName: dto.originalFileName,
            mimeType: dto.mimeType,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
        } as FileItemModel);
    }
}
