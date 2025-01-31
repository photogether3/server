import { Injectable } from '@nestjs/common';
import { and, eq, isNull } from 'drizzle-orm';

import { DrizzleRepository, users } from 'src/shared/database';

import { UserModel } from '../models/user.model';

@Injectable()
export class UserRepository extends DrizzleRepository {

    async findUserById(userId: string) {
        const result = await this.db
            .select()
            .from(users)
            .where(
                and(
                    eq(users.id, userId),
                    isNull(users.deletedAt),
                ),
            ).get();
        return this.fromDrizzleModel(UserModel, result);
    }

    async findUserByEmail(email: string) {
        const result = await this.db
            .select()
            .from(users)
            .where(
                and(
                    eq(users.email, email),
                    isNull(users.deletedAt),
                ),
            ).get();
        return this.fromDrizzleModel(UserModel, result);
    }

    async save(user: UserModel) {
        await this.db
            .insert(users)
            .values(user.toPlainObject())
            .onConflictDoUpdate({
                target: users.id,
                set: user.toPlainObject(),
            });
    }
}
