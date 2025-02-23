import { plainToInstance } from 'class-transformer';
import { nanoid } from 'nanoid';

import { OrmModel } from 'src/shared/database';

export class UserTokenModel extends OrmModel {
    private static readonly REFRESH_EXPIRES_TIME: number = 7 * 24 * 60 * 60 * 1000; //7일
    readonly id: string;
    readonly userId: string;
    readonly refreshToken: string;
    readonly expiryDate: Date;
    readonly lastRefreshingDate: Date;

    static from(param: Pick<UserTokenModel, 'userId' | 'refreshToken'>) {
        const now: Date = new Date();
        return plainToInstance(UserTokenModel, {
            id: nanoid(30),
            userId: param.userId,
            refreshToken: param.refreshToken,
            expiryDate: new Date(Date.now() + UserTokenModel.REFRESH_EXPIRES_TIME),
            lastRefreshingDate: now,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
        } as UserTokenModel);
    }

    withUpdateRefreshToken(refreshToken: string) {
        const now = new Date();
        return plainToInstance(UserTokenModel, {
            ...this,
            refreshToken,
            refreshTokenExpiryDate: new Date(Date.now() + UserTokenModel.REFRESH_EXPIRES_TIME),
            lastRefreshingDate: now,
            updatedAt: now,
        } as UserTokenModel);
    }

    withRemove(): UserTokenModel {
        const now: Date = new Date();
        return plainToInstance(UserTokenModel, {
            ...this,
            deletedAt: now,
        } as UserTokenModel);
    }
}
