import { Module } from '@nestjs/common';
import { RouterModule as NestRouterModule, Routes } from '@nestjs/core';

import { CollectionModule } from './app/collection/application';
import { PostModule } from './app/post';
import { FileModule } from './app/file-system/application';
import { AuthModule } from './app/auth/application';
import { UserModule } from './app/user/application';
import { CategoryModule } from './app/category/application';

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
        path: 'categories',
        module: CategoryModule,
    },
    {
        path: 'collections',
        module: CollectionModule,
    },
    {
        path: 'posts',
        module: PostModule,
    },
    {
        path: 'files',
        module: FileModule,
    },
];

@Module({
    imports: [
        NestRouterModule.register(routes),
        AuthModule,
        UserModule,
        CategoryModule,
        CollectionModule,
        PostModule,
        FileModule,
    ],
})
export class RouterModule {
}
