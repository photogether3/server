import { OrmModel } from 'src/shared/database';
import { plainToInstance } from 'class-transformer';
import { nanoid } from 'nanoid';

export class FavoriteModel extends OrmModel {

    readonly favoriteId: string;
    readonly name: string;

    static from(name: string) {
        return plainToInstance(FavoriteModel, {
            favoriteId: nanoid(30),
            name,
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
