import { Injectable } from '@nestjs/common';

import { JwtUtilService } from 'src/shared/jwt';
import { MailService } from 'src/shared/mail';
import { DiscordColors, DiscordWebHookService } from 'src/shared/third-party';

import {
    GenerateOtpBodyDto,
    LoginBodyDto,
    RegisterBodyDto,
    UserModel,
    UserService,
    UserTokenService,
    VerifyOtpBodyDto,
} from '../../core';

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

    async login(body: LoginBodyDto) {
        const user = await this.userService.verifyCredentials(body.email, body.password);
        await this.userService.verifyActiveUser(user);
        const tokens = this.jwtUtilService.getTokens(user.id);
        await this.userTokenService.createOrUpdate(user.id, tokens.refreshToken);
        return tokens;
    }

    async register(body: RegisterBodyDto) {
        await this.userService.verifyDuplicateEmail(body.email);
        await this.userService.create(body.email, body.password);
        await this.discordWebHook.sendMessage('[회원가입 알림] 새로운 유저가 등장했어요. 😍', DiscordColors.INFO);
    }

    async generateOtp(body: GenerateOtpBodyDto) {
        let user = await this.userService.getUserByEmailOrThrow(body.email);
        user = await this.userService.updateOtp(user);
        await this.mailService.sendOtpCode(user.email, user.otp);
    }

    async verifyOtp(body: VerifyOtpBodyDto) {
        let user = await this.userService.getUserByEmailOrThrow(body.email);
        user = await this.userService.verifyOtp(user, body.otp);
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
