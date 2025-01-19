import {Module} from "@nestjs/common";

import {UserDomainModule} from "src/features/user";
import {UserTokenModule} from "src/features/user-token";

import {AuthController} from "./auth.controller";
import {AuthFacade} from "./auth.facade";

@Module({
    imports: [
        UserDomainModule,
        UserTokenModule
    ],
    controllers: [AuthController],
    providers: [AuthFacade],
})
export class AuthModule {}