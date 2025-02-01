import { Body, Controller, Delete, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtResourceDTO } from 'src/shared/jwt/types';

import { GenerateOtpBodyDto, LoginBodyDto, RegisterBodyDto, UserModel, VerifyOtpBodyDto } from 'src/features/user/app';

import { AuthFacade } from '../facades/auth.facade';
import { Public } from '../auth.guard';
import { ApiRefreshTokenHeader, RefreshToken } from '../decorators/auth.decorator';
import { UserParam } from '../decorators/user.decorator';

@Controller({ path: 'auth', version: '1' })
@ApiTags('일반인증')
export class AuthController {

    constructor(
        private readonly authFacade: AuthFacade,
    ) {
    }

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '로그인' })
    @ApiResponse({ type: JwtResourceDTO })
    async login(@Body() body: LoginBodyDto) {
        return await this.authFacade.login(body);
    }

    @Public()
    @Post('register')
    @ApiOperation({ summary: '회원가입' })
    async register(@Body() body: RegisterBodyDto) {
        return await this.authFacade.register(body);
    }

    @Public()
    @Post('otp/generate')
    @ApiOperation({ summary: 'OTP 발급' })
    async generateOtp(@Body() body: GenerateOtpBodyDto) {
        return await this.authFacade.generateOtp(body);
    }

    @Public()
    @Post('otp/verify')
    @ApiOperation({ summary: 'OTP 검증 및 토큰 발급' })
    @ApiResponse({ type: JwtResourceDTO })
    async verifyOtp(@Body() body: VerifyOtpBodyDto) {
        return await this.authFacade.verifyOtp(body);
    }

    @Public()
    @ApiRefreshTokenHeader()
    @Post('refresh')
    @ApiOperation({ summary: '토큰 재발급' })
    @ApiResponse({ type: JwtResourceDTO })
    async refresh(@RefreshToken() refreshToken: string) {
        return await this.authFacade.refresh(refreshToken);
    }

    @Delete('logout')
    @ApiBearerAuth()
    @ApiOperation({ summary: '로그아웃' })
    async logout(@UserParam() user: UserModel) {
        return await this.authFacade.logout(user);
    }
}
