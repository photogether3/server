import {Module} from "@nestjs/common";

import {UserDomainModule} from "src/features/user";
import {UserTokenModule} from "src/features/user-token";

import {UserController} from "./user.controller";
import {UserFacade} from "./user.facade";

@Module({
    imports: [
        UserDomainModule,
        UserTokenModule
    ],
    controllers: [UserController],
    providers: [UserFacade]
})
export class UserModule {}