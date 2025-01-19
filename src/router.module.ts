import {Module} from "@nestjs/common";
import {RouterModule as NestRouterModule, Routes} from "@nestjs/core";

import {AuthModule} from "./app/auth";
import {UserModule} from "./app/user";
const routes: Routes = [
    {
        path: 'auth',
        module: AuthModule,
    },
    {
        path: 'users',
        module: UserModule,
    }
];

@Module({
    imports: [
        NestRouterModule.register(routes),
        AuthModule,
        UserModule
    ]
})
export class RouterModule {}