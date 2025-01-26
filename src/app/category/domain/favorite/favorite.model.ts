import { plainToInstance } from 'class-transformer';

import { OrmModel } from 'src/shared/database';

export class FavoriteModel extends OrmModel {
    readonly userId: string;
    readonly categoryId: string;

    static from(userId: string, categoryId: string) {
        return plainToInstance(FavoriteModel, {
            userId,
            categoryId,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        } as FavoriteModel);
    }

    withRemove() {
        const now = new Date();
        return plainToInstance(FavoriteModel, {
            ...this,
            deletedAt: now,
        } as FavoriteModel);
    }
}
