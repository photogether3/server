import {Injectable} from "@nestjs/common";

import {UserModel, UserService} from "src/features/user";
import {UserTokenService} from "src/features/user-token";
import {DrizzleService} from "src/shared/database";

import {
    IsEmailTakenResultDTO,
    ProfileResultDTO,
    UpdateNicknameDTO,
    UpdatePasswordToOtpDTO,
    WithdrawDTO,
} from './user.dto';

@Injectable()
export class UserFacade {

    constructor(
        private readonly drizzleService: DrizzleService,
        private readonly userService: UserService,
        private readonly userTokenService: UserTokenService
    ) {
    }

    async isEmailTaken(email: string) {
        const isDuplicated = await this.userService.isEmailTaken(email);
        return {isDuplicated} as IsEmailTakenResultDTO;
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

    async updateNickname(user: UserModel, dto: UpdateNicknameDTO) {
        user = await this.userService.updateNickname(user, dto.nickname);
        return ProfileResultDTO.from(user);
    }
}
