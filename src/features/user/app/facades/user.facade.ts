import { Injectable } from '@nestjs/common';

import { DrizzleService, toKSTDate } from 'src/shared/database';

import { FileManager } from 'src/features/file/app';
import { CategoryService, FavoriteService } from 'src/features/category/core';

import {
    IsEmailTakenResultDto,
    ProfileResultDto,
    UpdatePasswordToOtpBodyDto,
    UpdateProfileBodyDto,
    UpdateProfileDto,
    UserModel,
    UserService,
    UserTokenService,
    WithdrawBodyDto,
} from '../../core';

@Injectable()
export class UserFacade {

    constructor(
        private readonly drizzleService: DrizzleService,
        private readonly fileManager: FileManager,
        private readonly categoryService: CategoryService,
        private readonly favoriteService: FavoriteService,
        private readonly userService: UserService,
        private readonly userTokenService: UserTokenService,
    ) {
    }

    async isEmailTaken(email: string) {
        const isDuplicated = await this.userService.isEmailTaken(email);
        return { isDuplicated } as IsEmailTakenResultDto;
    }

    async getProfile(user: UserModel) {
        let dto: ProfileResultDto = {
            id: user.id,
            nickname: user.nickname,
            bio: user.bio,
            email: user.email,
            createdAt: toKSTDate(user.createdAt),
            updatedAt: toKSTDate(user.updatedAt),
            imageUrl: null,
        };
        if (user.fileGroupId) {
            const imageUrl = await this.fileManager.getFileUrl(user.fileGroupId);
            dto = { ...dto, imageUrl };
        }
        return dto;
    }

    async updatePassword(body: UpdatePasswordToOtpBodyDto) {
        const user = await this.userService.getUserByEmailOrThrow(body.email);
        await this.userService.verifyOtp(user, body.otp);
        await this.userService.updateOtp(user, true);
        await this.userService.updatePassword(user, body.password);
    }

    async updateProfile(user: UserModel, body: UpdateProfileBodyDto) {
        const { file, nickname, bio, categoryIds } = body;

        await this.drizzleService.runInTx(async () => {
            let updateProfileDto: UpdateProfileDto = { nickname, bio, fileGroupId: null };
            if (file) {
                const { fileGroupId } = await this.fileManager.upload(file);
                updateProfileDto = { ...updateProfileDto, fileGroupId };
            }
            await this.userService.updateProfile(user, updateProfileDto);

            await this.categoryService.verifyCategories(categoryIds);
            await this.favoriteService.createOrUpdate(user.id, categoryIds);
        });
    }

    async withdraw(user: UserModel, body: WithdrawBodyDto) {
        await this.userService.verifyOtp(user, body.otp);

        await this.drizzleService.runInTx(async () => {
            await this.userTokenService.removeByUserId(user.id);
            await this.userService.remove(user);
        });
    }
}
