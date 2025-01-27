import { Injectable } from '@nestjs/common';

import { DrizzleService, toKSTDate } from 'src/shared/database';

import { CategoryService, FavoriteService } from '../../category/domain';
import { FileManager } from '../../file/domain';

import {
    IsEmailTakenResultDTO,
    ProfileResultDTO,
    UpdatePasswordToOtpDTO,
    UpdateProfileDTO,
    UserModel,
    UserService,
    UserTokenService,
    WithdrawDTO,
} from '../domain';
import { UpdateProfileWithFileDTO } from './dto';

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
        return { isDuplicated } as IsEmailTakenResultDTO;
    }

    async getProfile(user: UserModel) {
        let dto: ProfileResultDTO = {
            id: user.id,
            nickname: user.nickname,
            bio: user.bio,
            email: user.email,
            createdAt: toKSTDate(user.createdAt),
            updatedAt: toKSTDate(user.updatedAt),
            imageUrl: null,
        };
        if (user.fileGroupId) {
            const imageUrl = await this.fileManager.getFileUrl(user.id, user.fileGroupId);
            dto = { ...dto, imageUrl };
        }
        return dto;
    }

    async updatePassword(dto: UpdatePasswordToOtpDTO) {
        const user = await this.userService.getUserByEmailOrThrow(dto.email);
        await this.userService.verifyOtp(user, dto.otp);
        await this.userService.updateOtp(user, true);
        await this.userService.updatePassword(user, dto.password);
    }

    async updateProfile(user: UserModel, _dto: UpdateProfileWithFileDTO) {
        const { file, nickname, bio, categoryIds } = _dto;

        await this.drizzleService.runInTx(async () => {
            let updateProfileDto: UpdateProfileDTO = { nickname, bio, fileGroupId: null };
            if (file) {
                const { fileGroupId } = await this.fileManager.upload(user.id, file);
                updateProfileDto = { ...updateProfileDto, fileGroupId };
            }
            await this.userService.updateProfile(user, updateProfileDto);

            await this.categoryService.verifyCategories(categoryIds);
            await this.favoriteService.createOrUpdate(user.id, categoryIds);
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
