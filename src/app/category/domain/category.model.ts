import { plainToInstance } from 'class-transformer';

import { OrmModel } from 'src/shared/database';

export class CategoryModel extends OrmModel {

    readonly categoryId: string;
    readonly name: string;

    static from(categoryId: string, name: string) {
        return plainToInstance(CategoryModel, {
            categoryId,
            name,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        } as CategoryModel);
    }

    static fromDrizzleModel(param: any) {
        return plainToInstance(CategoryModel, param as CategoryModel);
    }

    withRemove() {
        return plainToInstance(CategoryModel, {
            ...this,
            deletedAt: new Date(),
        } as CategoryModel);
    }
}
