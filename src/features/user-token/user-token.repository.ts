import {Injectable} from "@nestjs/common";
import {and, eq, isNull} from "drizzle-orm";

import {DrizzleService, userTokens} from "src/shared/database";

import {UserTokenModel} from "./user-token.model";

@Injectable()
export class UserTokenRepository {

    constructor(
        private readonly drizzleService: DrizzleService
    ) {
    }

    async findUserTokenByUserId(userId: string) {
        const results = await this.drizzleService.db
            .select()
            .from(userTokens)
            .where(
                and(
                    eq(userTokens.userId, userId),
                    isNull(userTokens.deletedAt)
                )
            )
            .limit(1);
        if (results.length === 0) return null;

        const entity = results.shift();
        return UserTokenModel.fromDrizzleModel(entity);
    }

    async findUserTokenByRefreshToken(refreshToken: string) {
        const results = await this.drizzleService.db
            .select()
            .from(userTokens)
            .where(
                and(
                    eq(userTokens.refreshToken, refreshToken),
                    isNull(userTokens.deletedAt)
                )
            )
            .limit(1);
        if (results.length === 0) return null;

        const entity = results.shift();
        return UserTokenModel.fromDrizzleModel(entity);
    }

    async save(userToken: UserTokenModel) {
        await this.drizzleService.db
            .insert(userTokens)
            .values(userToken.toPlainObject())
            .onConflictDoUpdate({
                target: userTokens.id,
                set: userToken.toPlainObject()
            });
    }
}