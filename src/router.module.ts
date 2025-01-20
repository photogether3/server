import {Module} from "@nestjs/common";
import {RouterModule as NestRouterModule, Routes} from "@nestjs/core";

import {AuthModule} from "./app/auth";
import {UserModule} from "./app/user";
import { CollectionModule } from './app/collection';

const routes: Routes = [
    {
        path: 'auth',
        module: AuthModule,
    },
    {
        path: 'users',
        module: UserModule,
    },
    {
        path: 'collections',
        module: CollectionModule
    }
];

@Module({
    imports: [
        NestRouterModule.register(routes),
        AuthModule,
        UserModule,
        CollectionModule
    ]
})
export class RouterModule {}
