import { Module } from '@nestjs/common';
import { RouterModule as NestRouterModule, Routes } from '@nestjs/core';

import { AuthModule } from './app/auth';
import { UserModule } from './app/user';
import { CollectionModule } from './app/collection';
import { FavoriteModule } from './app/favorite';
import { PostModule } from './app/post';

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
        path: 'favorites',
        module: FavoriteModule,
    },
    {
        path: 'collections',
        module: CollectionModule,
    },
    {
        path: 'posts',
        module: PostModule,
    },
];

@Module({
    imports: [
        NestRouterModule.register(routes),
        AuthModule,
        UserModule,
        FavoriteModule,
        CollectionModule,
        PostModule,
    ],
})
export class RouterModule {
}
