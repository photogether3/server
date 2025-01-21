import { Injectable } from '@nestjs/common';

import { JwtUtilService } from 'src/shared/jwt';
import { MailService } from 'src/shared/mail';
import { DiscordColors, DiscordWebHookService } from 'src/shared/third-party';

import { UserModel, UserService, UserTokenService } from '../user/public-api';

import { GenerateOtpDTO, LoginDTO, RegisterDTO, VerifyOtpDTO } from './auth.dto';

@Injectable()
export class AuthFacade {

    constructor(
        private readonly mailService: MailService,
        private readonly jwtUtilService: JwtUtilService,
        private readonly discordWebHook: DiscordWebHookService,
        private readonly userService: UserService,
        private readonly userTokenService: UserTokenService,
    ) {
    }

    async login(dto: LoginDTO) {
        const user = await this.userService.verifyCredentials(dto.email, dto.password);
        await this.userService.verifyActiveUser(user);
        const tokens = this.jwtUtilService.getTokens(user.id);
        await this.userTokenService.createOrUpdate(user.id, tokens.refreshToken);
        return tokens;
    }

    async register(dto: RegisterDTO) {
        await this.userService.verifyDuplicateEmail(dto.email);
        await this.userService.create(dto.email, dto.password);
        await this.discordWebHook.sendMessage('[회원가입 알림] 새로운 유저가 등장했어요. 😍', DiscordColors.INFO);
    }

    async generateOtp(dto: GenerateOtpDTO) {
        let user = await this.userService.getUserByEmailOrThrow(dto.email);
        user = await this.userService.updateOtp(user);
        await this.mailService.sendOtpCode(user.email, user.otp);
    }

    async verifyOtp(dto: VerifyOtpDTO) {
        let user = await this.userService.getUserByEmailOrThrow(dto.email);
        user = await this.userService.verifyOtp(user, dto.otp);
        user = await this.userService.updateOtp(user, true);
        user = await this.userService.updateEmailVerified(user);
        const tokens = this.jwtUtilService.getTokens(user.id);
        await this.userTokenService.createOrUpdate(user.id, tokens.refreshToken);
        return tokens;
    }

    async refresh(refreshToken: string) {
        const userToken = await this.userTokenService.getUserTokenByRefreshTokenOrThrow(refreshToken);
        const tokens = this.jwtUtilService.getTokens(userToken.userId);
        await this.userTokenService.update(userToken, tokens.refreshToken);
        return tokens;
    }

    async logout(user: UserModel) {
        const userToken = await this.userTokenService.getUserTokenByUserIdOrThrow(user.id);
        await this.userTokenService.remove(userToken);
    }
}
