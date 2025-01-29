import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { UserAppModule } from '../app';
import { AuthGuard } from './auth.guard';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';

@Module({
    imports: [
        UserAppModule,
    ],
    controllers: [
        AuthController,
        UserController,
    ],
    providers: [
        { provide: APP_GUARD, useClass: AuthGuard },
    ],
})
export class UserApiModule {
}
