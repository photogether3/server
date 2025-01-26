import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserTokenService } from './user-token/user-token.service';
import { UserRepository, UserTokenRepository } from '../infrastructure';

@Module({
    providers: [
        UserService,
        UserRepository,
        UserTokenService,
        UserTokenRepository,
    ],
    exports: [
        UserService,
        UserTokenService,
    ],
})
export class UserDomainModule {
}
