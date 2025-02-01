import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
    BadRequestException,
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

import {
    IsEmailTakenResultDto,
    ProfileResultDto,
    ResetDataBodyDto,
    UpdatePasswordBodyDto,
    UpdatePasswordToOtpBodyDto,
    UpdateProfileBodyDto,
    UserModel,
    WithdrawBodyDto,
} from 'src/features/user/app';

import { UserFacade } from '../facades/user.facade';
import { UserParam } from '../decorators/user.decorator';
import { Public } from '../auth.guard';

@Controller({ path: 'users', version: '1' })
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
        let categoryIds: string[] = [];
        try {
            categoryIds = JSON.parse(body.categoryIds);
        } catch (err) {
            throw new BadRequestException('카테고리 데이터 변환에 실패하였습니다.');
        }
        return this.userFacade.updateProfile(user, body, categoryIds);
    }

    @Public()
    @Patch('password')
    @ApiOperation({ summary: 'OTP인증 후 비밀번호 변경' })
    async updatePasswordFromOtp(@Body() body: UpdatePasswordToOtpBodyDto) {
        await this.userFacade.updatePasswordByOtp(body);
    }

    @Patch('me/password')
    @ApiBearerAuth()
    @ApiOperation({ summary: '비밀번호 변경' })
    async updatePassword(@UserParam() user: UserModel, @Body() body: UpdatePasswordBodyDto) {
        return await this.userFacade.updatePassword(user, body);
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
    @ApiOperation({ summary: 'OTP 인증 후 회원탈퇴' })
    async withdraw(@UserParam() user: UserModel, @Body() body: WithdrawBodyDto) {
        await this.userFacade.withdraw(user, body);
    }
}
