import { Module } from "@nestjs/common";
import {APP_GUARD} from "@nestjs/core";

import {UserService} from "./user.service";
import {UserRepository} from "./user.repository";
import {AuthGuard} from "./auth.guard";

@Module({
    providers: [
        UserService,
        UserRepository,
        { provide: APP_GUARD, useClass: AuthGuard },
    ],
    exports: [UserService],
})
export class UserDomainModule {}