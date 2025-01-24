import { Injectable } from '@nestjs/common';

import { DrizzleService } from 'src/shared/database';

import { CategoryService, FavoriteService } from '../../category/domain';

import {
    IsEmailTakenResultDTO,
    UpdatePasswordToOtpDTO,
    UpdateProfileDTO,
    UserModel,
    UserService,
    UserTokenService,
    WithdrawDTO,
} from '../domain';

@Injectable()
export class UserFacade {

    constructor(
        private readonly drizzleService: DrizzleService,
        private readonly categoryService: CategoryService,
        private readonly favoriteService: FavoriteService,
        private readonly userService: UserService,
        private readonly userTokenService: UserTokenService,
    ) {
    }

    async isEmailTaken(email: string) {
        const isDuplicated = await this.userService.isEmailTaken(email);
        return { isDuplicated } as IsEmailTakenResultDTO;
    }

    async updatePassword(dto: UpdatePasswordToOtpDTO) {
        const user = await this.userService.getUserByEmailOrThrow(dto.email);
        await this.userService.verifyOtp(user, dto.otp);
        await this.userService.updateOtp(user, true);
        await this.userService.updatePassword(user, dto.password);
    }

    async updateProfile(user: UserModel, dto: UpdateProfileDTO) {
        await this.drizzleService.runInTx(async () => {
            await this.userService.updateProfile(user, dto.nickname, dto.bio);
            await this.categoryService.verifyCategories(dto.categoryIds);
            await this.favoriteService.createOrUpdate(user.id, dto.categoryIds);
        });
    }

    async withdraw(user: UserModel, dto: WithdrawDTO) {
        await this.userService.verifyOtp(user, dto.otp);

        await this.drizzleService.runInTx(async () => {
            await this.userTokenService.removeByUserId(user.id);
            await this.userService.remove(user);
        });
    }
}
