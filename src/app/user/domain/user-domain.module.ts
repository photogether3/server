import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserTokenService } from './user-token/user-token.service';
import { UserTokenRepository } from './user-token/user-token.repository';

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
