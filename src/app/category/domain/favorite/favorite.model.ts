import { plainToInstance } from 'class-transformer';
import { nanoid } from 'nanoid';

import { OrmModel } from 'src/shared/database';

export class FavoriteModel extends OrmModel {

    readonly favoriteId: string;
    readonly userId: string;
    readonly categoryId: string;

    static from(userId: string, categoryId: string) {
        return plainToInstance(FavoriteModel, {
            favoriteId: nanoid(30),
            userId,
            categoryId,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        } as FavoriteModel);
    }

    static fromDrizzleModel(param: any) {
        return plainToInstance(FavoriteModel, param as FavoriteModel);
    }
}

/**
 * Param Interfaces
 */
