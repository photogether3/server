import {Injectable} from "@nestjs/common";
import {and, eq, isNull} from "drizzle-orm";

import {DrizzleService, users} from "src/shared/database";

import {UserModel} from "./user.model";

@Injectable()
export class UserRepository {

    constructor(
        private readonly drizzleService: DrizzleService
    ) {
    }

    async findUserById(userId: string) {
        const results = await this.drizzleService.db
            .select()
            .from(users)
            .where(
                and(
                    eq(users.id, userId),
                    isNull(users.deletedAt)
                )
            )
            .limit(1);
        if (results.length === 0) return null;

        const entity = results.shift();
        return UserModel.fromDrizzleModel(entity);
    }

    async findUserByEmail(email: string) {
        const results = await this.drizzleService.db
            .select()
            .from(users)
            .where(
                and(
                    eq(users.email, email),
                    isNull(users.deletedAt)
                )
            )
            .limit(1);
        if (results.length === 0) return null;

        const entity = results.shift();
        return UserModel.fromDrizzleModel(entity);
    }

    async save(user: UserModel) {
        await this.drizzleService.db
            .insert(users)
            .values(user.toPlainObject())
            .onConflictDoUpdate({
                target: users.id,
                set: user.toPlainObject()
            });
    }
}