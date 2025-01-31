import { IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { USER_RULES } from '../rule';

export class UpdateProfileBodyDto {
    @IsNotEmpty()
    @ApiProperty({ description: '닉네임', example: '든든한고래밥' })
    readonly nickname: string;

    @IsNotEmpty()
    @ApiProperty({ description: '자기소개', example: '안녕하세요.' })
    readonly bio: string;

    @IsOptional()
    @ApiProperty({ description: '카테고리 ID 목록(문자열Json)', type: String, example: JSON.stringify(['CTGR1', 'CTGR2']) })
    readonly categoryIds: string;

    @IsOptional()
    @ApiProperty({
        description: '프로필 이미지 파일',
        type: 'string',
        format: 'binary',
    })
    file: Express.Multer.File;
}

export class UpdatePasswordToOtpBodyDto {
    @IsNotEmpty({ message: 'OTP 코드가 비어있습니다.' })
    @Length(6, 6, { message: 'OTP는 6자리입니다.' })
    @ApiProperty({ description: 'OTP 코드', example: '123456' })
    readonly otp: string;

    @IsNotEmpty({ message: '이메일은 필수 입력 항목입니다.' })
    @Matches(USER_RULES.email.regex, { message: USER_RULES.email.regexErrMsg })
    @ApiProperty({ description: '이메일', example: 'test@gmail.com' })
    readonly email: string;

    @IsNotEmpty({ message: '비밀번호는 필수 입력 항목입니다.' })
    @Length(USER_RULES.password.min, USER_RULES.password.max, { message: USER_RULES.password.lengthErrMsg })
    @Matches(USER_RULES.password.regex, { message: USER_RULES.password.regexErrMsg })
    @ApiProperty({ description: '비밀번호', example: '1q2w3e1!@' })
    readonly password: string;
}

export class UpdatePasswordBodyDto {
    @IsNotEmpty({ message: '현재 비밀번호를 입력해 주세요.' })
    @ApiProperty({ description: '현재 비밀번호', example: '1q2w3e1!@' })
    readonly currentPassword: string;

    @IsNotEmpty({ message: '비밀번호는 필수 입력 항목입니다.' })
    @Length(USER_RULES.password.min, USER_RULES.password.max, { message: USER_RULES.password.lengthErrMsg })
    @Matches(USER_RULES.password.regex, { message: USER_RULES.password.regexErrMsg })
    @ApiProperty({ description: '새로운 비밀번호', example: '1q2w3e1!@' })
    readonly newPassword: string;
}

export class ResetDataBodyDto {
    @IsNotEmpty({ message: 'OTP 코드가 비어있습니다.' })
    @Length(6, 6, { message: 'OTP는 6자리입니다.' })
    @ApiProperty({ description: 'OTP 코드', example: '123456' })
    readonly otp: string;
}

export class WithdrawBodyDto extends ResetDataBodyDto {
}
