import { Injectable } from '@nestjs/common';

import { DrizzleService } from 'src/shared/database';

import {
    IsEmailTakenResultDTO,
    ProfileResultDTO,
    UpdatePasswordToOtpDTO,
    UpdateProfileDTO,
    WithdrawDTO,
} from './user.dto';
import { UserService } from './core/user.service';
import { UserTokenService } from './token/user-token.service';
import { UserModel } from './core/user.model';

@Injectable()
export class UserFacade {

    constructor(
        private readonly drizzleService: DrizzleService,
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

    async withdraw(user: UserModel, dto: WithdrawDTO) {
        await this.userService.verifyOtp(user, dto.otp);

        await this.drizzleService.runInTx(async () => {
            await this.userTokenService.removeByUserId(user.id);
            await this.userService.remove(user);
        });
    }

    async updateProfile(user: UserModel, dto: UpdateProfileDTO) {
        await this.drizzleService.runInTx(async () => {
            user = await this.userService.updateProfile(user, dto.nickname, dto.bio);
            return ProfileResultDTO.from(user);
        });
    }
}
