import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserFacade } from './user.facade';
import { UserDomainModule } from '../domain';

@Module({
    imports: [
        UserDomainModule,
    ],
    controllers: [UserController],
    providers: [UserFacade],
})
export class UserModule {
}
