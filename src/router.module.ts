import { Module } from '@nestjs/common';
import { RouterModule as NestRouterModule, Routes } from '@nestjs/core';

import { AuthModule } from './app/auth';
import { UserModule } from './app/user';
import { CollectionModule } from './app/collection';
import { PostModule } from './app/post';
import { FileSystemModule } from './app/file-system';
import { CategoryAppModule } from './app/category/application';

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
        module: CategoryAppModule,
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
        module: FileSystemModule,
    },
];

@Module({
    imports: [
        NestRouterModule.register(routes),
        AuthModule,
        UserModule,
        CategoryAppModule,
        CollectionModule,
        PostModule,
        FileSystemModule,
    ],
})
export class RouterModule {
}
