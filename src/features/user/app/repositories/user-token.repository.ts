import { Injectable } from '@nestjs/common';
import { and, eq, isNull } from 'drizzle-orm';

import { DrizzleRepository, userTokens } from 'src/shared/database';

import { UserTokenModel } from '../models/user-token.model';

@Injectable()
export class UserTokenRepository extends DrizzleRepository {

    async findUserTokenByUserId(userId: string) {
        const result = await this.db
            .select()
            .from(userTokens)
            .where(
                and(
                    eq(userTokens.userId, userId),
                    isNull(userTokens.deletedAt),
                ),
            )
            .get();
        return this.fromDrizzleModel(UserTokenModel, result);
    }

    async findUserTokenByRefreshToken(refreshToken: string) {
        const result = await this.db
            .select()
            .from(userTokens)
            .where(
                and(
                    eq(userTokens.refreshToken, refreshToken),
                    isNull(userTokens.deletedAt),
                ),
            )
            .get();
        return this.fromDrizzleModel(UserTokenModel, result);
    }

    async save(userToken: UserTokenModel) {
        await this.db
            .insert(userTokens)
            .values(userToken.toPlainObject())
            .onConflictDoUpdate({
                target: userTokens.id,
                set: userToken.toPlainObject(),
            });
    }
}
