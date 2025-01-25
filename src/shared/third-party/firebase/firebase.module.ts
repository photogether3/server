import { Global, Logger, Module } from '@nestjs/common';

import { cert, initializeApp, ServiceAccount } from 'firebase-admin/app';

@Global()
@Module({
    imports: [],
    providers: [],
    exports: [],
})
export class FirebaseModule {

    constructor() {
        import('./firebase-admin-sdk.json').then((serviceAccount) => {
            initializeApp({
                credential: cert(serviceAccount as ServiceAccount),
            });
            Logger.debug(`Init Firebase Module`);
        });
    }
}
