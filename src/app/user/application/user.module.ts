import { Module } from '@nestjs/common';

import { CategoryDomainModule } from '../../category/domain';

import { UserController } from './user.controller';
import { UserFacade } from './user.facade';
import { UserDomainModule } from '../domain';

@Module({
    imports: [
        UserDomainModule,
        CategoryDomainModule,
    ],
    controllers: [UserController],
    providers: [UserFacade],
})
export class UserModule {
}
