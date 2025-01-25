import { Inject, Injectable } from '@nestjs/common';
import { App } from 'firebase-admin/app';

@Injectable()
export class FirebaseStorageService {

    constructor(
        @Inject('FIREBASE_APP')
        private readonly firebaseApp: App,
    ) {
        console.log(firebaseApp.name);
        console.log('hello');
    }
}
