import { Module } from '@nestjs/common';

import { FileAppModule } from '../../file/app';
import { CategoryCoreModule } from '../../category/core';

import { UserCoreModule } from '../core';
import { AuthFacade } from './facades/auth.facade';
import { UserFacade } from './facades/user.facade';

@Module({
    imports: [
        UserCoreModule,
        CategoryCoreModule,
        FileAppModule,
    ],
    providers: [
        AuthFacade,
        UserFacade,
    ],
    exports: [
        UserCoreModule,
        AuthFacade,
        UserFacade,
    ],
})
export class UserAppModule {
}
