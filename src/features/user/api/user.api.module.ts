import { Module } from '@nestjs/common';

import { CategoryModule } from 'src/features/category/app';
import { UserModule } from 'src/features/user/app';
import { FileModule } from 'src/features/file/app';

import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { UserFacade } from './facades/user.facade';
import { AuthFacade } from './facades/auth.facade';

@Module({
    imports: [
        CategoryModule,
        FileModule,
        UserModule,
    ],
    controllers: [
        AuthController,
        UserController,
    ],
    providers: [
        AuthFacade,
        UserFacade,
    ],
    exports: [
        UserModule,
    ],
})
export class UserApiModule {
}
