import { DynamicModule, Module } from '@nestjs/common';

import { FirebaseStorageService } from './firebase-storage.service';
import { provideFirebaseApp } from './providers/firebase-app.provider';

@Module({})
export class FirebaseModule {

    static forRoot(): DynamicModule {
        return {
            module: FirebaseModule,
            global: true,
            imports: [],
            providers: [
                provideFirebaseApp(),
                FirebaseStorageService,
            ],
            exports: [
                FirebaseStorageService,
            ],
        };
    }
}
