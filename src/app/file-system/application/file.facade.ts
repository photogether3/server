import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { nanoid } from 'nanoid';
import { extname } from 'path';

import { FirebaseStorageService } from 'src/shared/third-party/firebase';
import { EnvService } from 'src/shared/env';
import { DrizzleTxService } from 'src/shared/database';

import { CreateFileDTO, FileResultDTO, FileService } from '../domain';

@Injectable()
export class FileFacade {

    /**
     * @desc 파일을 제공하는 URL
     */
    private readonly publicUrl: string;

    constructor(
        private readonly envService: EnvService,
        private readonly drizzleService: DrizzleTxService,
        private readonly firebaseStorage: FirebaseStorageService,
        private readonly fileService: FileService,
    ) {
        this.publicUrl = this.envService.getFirebaseEnv().storageUrl;
    }

    async creates(userId: string, files: Express.Multer.File[]) {
        return await this.drizzleService.runInTx(async () => {
            const dtos = await this.uploadFiles(files);
            const fileGroup = await this.fileService.creates(userId, dtos);

            return dtos.map(dto => ({
                fileGroupId: fileGroup.fileGroupId,
                originalFileName: dto.originalFileName,
                fileUrl: `${this.publicUrl}/${dto.filePath}`,
                filePath: dto.filePath,
                rank: dto.rank,
            } as FileResultDTO));
        });
    }

    /**
     * @todo 요청받은 파일을 저장합니다. 파일모델을 만들기 위한 데이터들을 반환받습니다.
     * @info firebase 스토리지 사용
     */
    private async uploadFiles(files: Express.Multer.File[]): Promise<CreateFileDTO[]> {
        return await Promise.all(
            files.map(async (file, index) => {
                const dto = this.createFileData(file, index + 1);
                await this.firebaseStorage.upload(dto.filePath, file);
                return dto;
            }),
        );
    }

    private createFileData(file: Express.Multer.File, rank: number) {
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
        } as CreateFileDTO;
    }
}
