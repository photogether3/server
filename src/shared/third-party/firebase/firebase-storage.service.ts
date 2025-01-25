import { Inject, Injectable } from '@nestjs/common';
import { App } from 'firebase-admin/app';
import { getStorage, Storage } from 'firebase-admin/storage';

import { FIREBASE_APP_TOKEN } from './providers/firebase-app.provider';

@Injectable()
export class FirebaseStorageService {

    private readonly storage: Storage;

    constructor(
        @Inject(FIREBASE_APP_TOKEN)
        private readonly firebaseApp: App,
    ) {
        this.storage = getStorage(this.firebaseApp);
    }
}
