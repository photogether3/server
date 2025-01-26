import { Module } from '@nestjs/common';

import { CategoryDomainModule } from '../../category/domain';
import { FileDomainModule } from '../../file-system/domain';

import { UserController } from './user.controller';
import { UserFacade } from './user.facade';
import { UserDomainModule } from '../domain';

@Module({
    imports: [
        CategoryDomainModule,
        FileDomainModule,
        UserDomainModule,
    ],
    controllers: [UserController],
    providers: [UserFacade],
})
export class UserModule {
}
