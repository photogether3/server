import { Module } from '@nestjs/common';

import { UserService } from './services/user.service';
import { UserTokenService } from './services/user-token.service';
import { UserRepository } from './repositories/user.repository';
import { UserTokenRepository } from './repositories/user-token.repository';

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
export class UserModule {
}
