import { Module } from '@nestjs/common';
import { RouterModule as NestRouterModule, Routes } from '@nestjs/core';

import { CollectionModule } from './app/collection';
import { PostModule } from './app/post';
import { FileSystemModule } from './app/file-system';
import { AuthModule } from './app/auth/application';
import { UserModule } from './app/user/application';
import { CategoryModule } from './app/category/application/category.module';

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
        module: FileSystemModule,
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
        FileSystemModule,
    ],
})
export class RouterModule {
}
