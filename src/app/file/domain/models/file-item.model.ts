import { plainToInstance } from 'class-transformer';

import { OrmModel } from 'src/shared/database';

import { CreateFileDTO } from '../file.dto';

export class FileItemModel extends OrmModel {
    readonly fileGroupId: string;
    readonly userId: string;
    readonly rank: number;
    readonly filePath: string;
    readonly fileName: string;
    readonly originalFileName: string;
    readonly mimeType: string;

    static from(fileGroupId: string, userId: string, dto: CreateFileDTO) {
        const now = new Date();
        return plainToInstance(FileItemModel, {
            fileGroupId,
            userId,
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
