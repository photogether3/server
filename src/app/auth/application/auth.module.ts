import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { UserDomainModule } from '../../user/domain';

import { AuthController } from './auth.controller';
import { AuthFacade } from './auth.facade';
import { AuthGuard } from '../framework';

@Module({
    imports: [
        UserDomainModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthFacade,
        { provide: APP_GUARD, useClass: AuthGuard },
    ],
})
export class AuthModule {
}
