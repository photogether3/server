import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { UserCoreModule, UserTokenModule } from '../user/public-api';

import { AuthController } from './auth.controller';
import { AuthFacade } from './auth.facade';
import { AuthGuard } from './auth.guard';

@Module({
    imports: [
        UserCoreModule,
        UserTokenModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthFacade,
        { provide: APP_GUARD, useClass: AuthGuard },
    ],
})
export class AuthModule {
}
