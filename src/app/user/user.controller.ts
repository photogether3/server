import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Public, UserModel, UserParam } from 'src/features/user';

import { UserFacade } from './user.facade';
import {
    IsEmailTakenResultDTO,
    ProfileResultDTO,
    UpdateNicknameDTO,
    UpdatePasswordToOtpDTO,
    WithdrawDTO,
} from './user.dto';

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

    @Patch('me/nickname')
    @ApiBearerAuth()
    @ApiOperation({ summary: '닉네임 변경' })
    @ApiResponse({ type: ProfileResultDTO })
    async updateNickname(@UserParam() user: UserModel, @Body() dto: UpdateNicknameDTO) {
        return await this.userFacade.updateNickname(user, dto);
    }

    @Public()
    @Patch('password')
    @ApiOperation({ summary: 'OTP인증 후 비밀번호 변경' })
    async updatePassword(@Body() dto: UpdatePasswordToOtpDTO) {
        await this.userFacade.updatePassword(dto);
    }

    @Delete('me/withdraw')
    @ApiBearerAuth()
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'OTP인증 후 회원탈퇴' })
    async withdraw(@UserParam() user: UserModel, @Body() dto: WithdrawDTO) {
        await this.userFacade.withdraw(user, dto);
    }
}
