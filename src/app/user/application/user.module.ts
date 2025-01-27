import { Module } from '@nestjs/common';

import { CategoryDomainModule } from '../../category/domain';
import { FileModule } from '../../file/application';

import { UserController } from './user.controller';
import { UserFacade } from './user.facade';
import { UserDomainModule } from '../domain';

@Module({
    imports: [
        CategoryDomainModule,
        FileModule,
        UserDomainModule,
    ],
    controllers: [UserController],
    providers: [UserFacade],
})
export class UserModule {
}
