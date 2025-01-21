import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserFacade } from './user.facade';
import { UserCoreModule } from './core/user-core.module';
import { UserTokenModule } from './token/user-token.module';

@Module({
    imports: [
        UserCoreModule,
        UserTokenModule,
    ],
    controllers: [UserController],
    providers: [UserFacade],
})
export class UserModule {
}
