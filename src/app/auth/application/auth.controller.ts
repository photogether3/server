import { Body, Controller, Delete, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtResourceDTO } from 'src/shared/jwt/types';

import { UserModel } from '../../user/domain';
import { UserParam } from '../../user/framework';

import { GenerateOtpDTO, LoginDTO, RegisterDTO, VerifyOtpDTO } from './auth.dto';
import { AuthFacade } from './auth.facade';
import { ApiRefreshTokenHeader, Public, RefreshToken } from '../framework';

@Controller({ version: '1' })
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
    async login(@Body() dto: LoginDTO) {
        return await this.authFacade.login(dto);
    }

    @Public()
    @Post('register')
    @ApiOperation({ summary: '회원가입' })
    async register(@Body() dto: RegisterDTO) {
        return await this.authFacade.register(dto);
    }

    @Public()
    @Post('otp/generate')
    @ApiOperation({ summary: 'OTP 발급' })
    async generateOtp(@Body() dto: GenerateOtpDTO) {
        return await this.authFacade.generateOtp(dto);
    }

    @Public()
    @Post('otp/verify')
    @ApiOperation({ summary: 'OTP 검증 및 토큰 발급' })
    @ApiResponse({ type: JwtResourceDTO })
    async verifyOtp(@Body() dto: VerifyOtpDTO) {
        return await this.authFacade.verifyOtp(dto);
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
