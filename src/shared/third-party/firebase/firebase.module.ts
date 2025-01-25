import { DynamicModule, Logger, Module, Provider } from '@nestjs/common';

import { App, cert, initializeApp, ServiceAccount } from 'firebase-admin/app';

import { FirebaseStorageService } from './firebase-storage.service';
import { provideFirebaseApp } from './providers/firebase-app.provider';

@Module({})
export class FirebaseModule {

    static forRoot(): DynamicModule {
        const firebaseAppProvider: Provider = {
            provide: 'FIREBASE_APP',
            useFactory: async (): Promise<App> => {
                const serviceAccount = await import('./firebase-admin-sdk.json');
                Logger.debug(`Init Firebase Module`);
                return initializeApp({
                    credential: cert(serviceAccount as ServiceAccount),
                });
            },
        };

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
