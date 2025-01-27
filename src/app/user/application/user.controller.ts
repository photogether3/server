import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Put,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Public } from '../../auth/framework';

import { IsEmailTakenResultDto, ProfileResultDto, UserModel } from '../domain';
import { UserFacade } from './user.facade';
import { ResetDataBodyDto, UpdatePasswordBodyDto, UpdatePasswordToOtpBodyDto, UpdateProfileBodyDto, WithdrawBodyDto } from './request-dto';
import { UserParam } from '../framework';

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
    @ApiResponse({ type: IsEmailTakenResultDto })
    async isEmailTaken(@Param('email') email: string) {
        return this.userFacade.isEmailTaken(email);
    }

    @Get('me')
    @ApiBearerAuth()
    @ApiOperation({ summary: '프로필 조회' })
    @ApiResponse({ type: ProfileResultDto })
    async getProfile(@UserParam() user: UserModel) {
        return await this.userFacade.getProfile(user);
    }

    @Put('me')
    @ApiBearerAuth()
    @ApiOperation({ summary: '프로필 수정' })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    async updateProfile(
        @UserParam() user: UserModel,
        @Body() body: UpdateProfileBodyDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        body.file = file;
        return this.userFacade.updateProfile(user, body);
    }

    @Public()
    @Patch('password')
    @ApiOperation({ summary: 'OTP인증 후 비밀번호 변경' })
    async updatePasswordFromOtp(@Body() body: UpdatePasswordToOtpBodyDto) {
        await this.userFacade.updatePassword(body);
    }

    @Patch('me/password')
    @ApiBearerAuth()
    @ApiOperation({ summary: '비밀번호 변경 [Draft]' })
    async updatePassword(@Body() body: UpdatePasswordBodyDto) {
        return;
    }

    @Delete('me/reset')
    @ApiBearerAuth()
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'OTP 인증 후 기록초기화 [Draft]' })
    async resetData(@UserParam() user: UserModel, @Body() body: ResetDataBodyDto) {
        return;
    }

    @Delete('me/withdraw')
    @ApiBearerAuth()
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'OTP 인증 후 회원탈퇴 [Draft]' })
    async withdraw(@UserParam() user: UserModel, @Body() body: WithdrawBodyDto) {
        await this.userFacade.withdraw(user, body);
    }
}
