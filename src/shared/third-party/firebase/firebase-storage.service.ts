import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { App } from 'firebase-admin/app';
import { getStorage, Storage } from 'firebase-admin/storage';

import { EnvService } from '../../env';

import { FIREBASE_APP_TOKEN } from './providers/firebase-app.provider';

@Injectable()
export class FirebaseStorageService {

    private readonly storage: Storage;
    private readonly bucket: string;

    constructor(
        @Inject(FIREBASE_APP_TOKEN)
        private readonly firebaseApp: App,
        private readonly envService: EnvService,
    ) {
        this.storage = getStorage(this.firebaseApp);
        this.bucket = this.envService.getFirebaseEnv().storageBucket;
        console.log(this.bucket);
    }

    /**
     * @todo 파이어베이스 스토리지에 파일을 저장합니다.
     * @warning 파일들은 기본적으로 '공개' 상태로 저장됩니다.
     * @throw 파이어베이스 장애 발생시 500 에러처리합니다.
     */
    async upload(filePath: string, file: Express.Multer.File): Promise<void> {
        const bucket = this.storage.bucket(this.bucket);

        try {
            const fileRef = bucket.file(filePath);
            await fileRef.save(file.buffer, {
                contentType: file.mimetype,
            });
            await fileRef.makePublic();
        } catch (err) {
            Logger.error(err);
            throw new InternalServerErrorException('파이어베이스에 장애가 발생하였습니다.');
        }
    }
}
