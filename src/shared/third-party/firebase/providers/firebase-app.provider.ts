import { Logger, Provider } from '@nestjs/common';

import { App, cert, initializeApp, ServiceAccount } from 'firebase-admin/app';

export const FIREBASE_APP_TOKEN = 'FIREBASE_APP_TOKEN';

export function provideFirebaseApp(): Provider {
    return {
        provide: FIREBASE_APP_TOKEN,
        useFactory: async (): Promise<App> => {
            const serviceAccount = await import('../firebase-admin-sdk.json');
            const app = initializeApp({
                credential: cert(serviceAccount as ServiceAccount),
            });
            Logger.debug(`Init Firebase Module`);
            return app;
        },
    };
}
