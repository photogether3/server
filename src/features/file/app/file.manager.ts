import { Injectable } from '@nestjs/common';
import { extname } from 'path';
import { format } from 'date-fns';
import { nanoid } from 'nanoid';

import { FirebaseStorageService } from 'src/shared/third-party/firebase';
import { EnvService } from 'src/shared/env';

import { CreateFileDto, FileFlags, FileGroupModel, FileService } from '../core';

@Injectable()
export class FileManager {

    /**
     * @desc 파일을 제공하는 URL
     */
    private readonly publicUrl: string;

    constructor(
        private readonly envService: EnvService,
        private readonly firebaseStorage: FirebaseStorageService,
        private readonly fileService: FileService,
    ) {
        this.publicUrl = this.envService.getFirebaseEnv().storageUrl;
    }

    async getFileUrl(fileGroupId: string): Promise<string> {
        const fileItem = await this.fileService.getFileItem(fileGroupId);
        return `${this.publicUrl}/${fileItem.filePath}`;
    }

    async upload(file: Express.Multer.File): Promise<FileGroupModel | null> {
        if (!file) return null;

        const metadata = this.getFileMetadata(file);
        await this.firebaseStorage.upload(metadata.filePath, file);
        return await this.fileService.create(metadata, FileFlags.PROFILE);
    }

    private getFileMetadata(file: Express.Multer.File, rank: number = 1) {
        const originalFileName = file.originalname;
        const fileExtension = extname(originalFileName);
        const fileDirectory = format(new Date(), 'yyyy/MM/dd');
        const fileName = `${nanoid(10)}${fileExtension}`;
        const fullPath = `${fileDirectory}/${fileName}`;
        const mimeType = file.mimetype;

        return {
            originalFileName,
            fileName,
            filePath: fullPath,
            mimeType,
            rank,
        } as CreateFileDto;
    }
}
