import { Module } from '@nestjs/common';

import { CategoryCoreModule, FavoriteModule } from '../category/public-api';

import { UserController } from './user.controller';
import { UserFacade } from './user.facade';
import { UserCoreModule } from './core/user-core.module';
import { UserTokenModule } from './token/user-token.module';

@Module({
    imports: [
        FavoriteModule,
        CategoryCoreModule,
        UserCoreModule,
        UserTokenModule,
    ],
    controllers: [UserController],
    providers: [UserFacade],
})
export class UserModule {
}
