import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Public } from '../auth/public-api';

import {
    IsEmailTakenResultDTO,
    ProfileResultDTO,
    ResetDataDTO,
    UpdatePasswordDTO,
    UpdatePasswordToOtpDTO,
    UpdateProfileDTO,
    WithdrawDTO,
} from './user.dto';
import { UserFacade } from './user.facade';
import { UserParam } from './user.decorator';
import { UserModel } from './core/user.model';

@Controller({ version: '1' })
@ApiTags('사용자 정보')
export class UserController {

    constructor(
        private readonly userFacade: UserFacade,
    ) {
    }

    @Public()
    @Get('emails/:email/duplicated')
    @ApiOperation({ summary: '이메일 중복 검증' })
    @ApiResponse({ type: IsEmailTakenResultDTO })
    async isEmailTaken(@Param('email') email: string) {
        return this.userFacade.isEmailTaken(email);
    }

    @Get('me')
    @ApiBearerAuth()
    @ApiOperation({ summary: '프로필 조회' })
    @ApiResponse({ type: ProfileResultDTO })
    async getProfile(@UserParam() user: UserModel) {
        return ProfileResultDTO.from(user);
    }

    @Put('me')
    @ApiBearerAuth()
    @ApiOperation({ summary: '프로필 수정 [Draft]' })
    async updateProfile(@UserParam() user: UserModel, @Body() dto: UpdateProfileDTO) {
        return this.userFacade.updateProfile(user, dto);
    }

    @Public()
    @Patch('password')
    @ApiOperation({ summary: 'OTP인증 후 비밀번호 변경' })
    async updatePasswordFromOtp(@Body() dto: UpdatePasswordToOtpDTO) {
        await this.userFacade.updatePassword(dto);
    }

    @Patch('me/password')
    @ApiBearerAuth()
    @ApiOperation({ summary: '비밀번호 변경 [Draft]' })
    async updatePassword(@Body() dto: UpdatePasswordDTO) {
        return;
    }

    @Delete('me/reset')
    @ApiBearerAuth()
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'OTP 인증 후 기록초기화 [Draft]' })
    async resetData(@UserParam() user: UserModel, @Body() dto: ResetDataDTO) {
        return;
    }

    @Delete('me/withdraw')
    @ApiBearerAuth()
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'OTP 인증 후 회원탈퇴 [Draft]' })
    async withdraw(@UserParam() user: UserModel, @Body() dto: WithdrawDTO) {
        await this.userFacade.withdraw(user, dto);
    }
}
