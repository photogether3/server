import { plainToInstance } from 'class-transformer';
import { nanoid } from 'nanoid';

import { OrmModel } from 'src/shared/database';

export class CategoryModel extends OrmModel {

    readonly categoryId: string;
    readonly name: string;

    static from(name: string) {
        return plainToInstance(CategoryModel, {
            categoryId: nanoid(30),
            name,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        } as CategoryModel);
    }

    static fromDrizzleModel(param: any) {
        return plainToInstance(CategoryModel, param as CategoryModel);
    }
}
