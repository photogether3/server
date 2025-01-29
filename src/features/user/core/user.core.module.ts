import { Module } from '@nestjs/common';

import { UserService } from './services/user.service';
import { UserTokenService } from './services/user-token.service';
import { UserRepository, UserTokenRepository } from '../infra';

@Module({
    imports: [],
    providers: [
        UserRepository,
        UserTokenRepository,
        UserService,
        UserTokenService,
    ],
    exports: [
        UserService,
        UserTokenService,
    ],
})
export class UserCoreModule {
}
