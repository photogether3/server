import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, Matches } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { USER_RULES, UserModel } from 'src/features/user';
import { toKSTDate } from '../../shared/database';

export class UpdateProfileDTO {
    @IsNotEmpty()
    @ApiProperty({ description: '닉네임' })
    readonly nickname: string;

    @IsNotEmpty()
    @ApiProperty({ description: '자기소개' })
    readonly bio: string;

    @IsNotEmpty()
    @ApiProperty({ description: '관심사 ID 목록' })
    readonly favoriteIds: string[];
}

export class UpdatePasswordToOtpDTO {
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

export class UpdatePasswordDTO {
    @IsNotEmpty({ message: '현재 비밀번호를 입력해 주세요.' })
    @ApiProperty({ description: '현재 비밀번호', example: '1q2w3e1!@' })
    readonly currentPassword: string;

    @IsNotEmpty({ message: '비밀번호는 필수 입력 항목입니다.' })
    @Length(USER_RULES.password.min, USER_RULES.password.max, { message: USER_RULES.password.lengthErrMsg })
    @Matches(USER_RULES.password.regex, { message: USER_RULES.password.regexErrMsg })
    @ApiProperty({ description: '새로운 비밀번호', example: '1q2w3e1!@' })
    readonly newPassword: string;
}

export class WithdrawDTO {
    @IsNotEmpty({ message: 'OTP 코드가 비어있습니다.' })
    @Length(6, 6, { message: 'OTP는 6자리입니다.' })
    @ApiProperty({ description: 'OTP 코드', example: '123456' })
    readonly otp: string;
}

/** @Response */

export class IsEmailTakenResultDTO {
    @ApiProperty({ description: '중복여부' })
    readonly isDuplicated: boolean;
}

export class ProfileResultDTO {
    @ApiProperty({ description: '사용자 ID' })
    readonly id: string;

    @ApiProperty({ description: '닉네임' })
    readonly nickname: string;

    @ApiProperty({ description: '자기소개' })
    readonly bio: string;

    @ApiProperty({ description: '이메일' })
    readonly email: string;

    @ApiProperty({ description: '생성일' })
    readonly createdAt: Date;

    @ApiProperty({ description: '수정일' })
    readonly updatedAt: Date;

    static from(user: UserModel) {
        return plainToInstance(ProfileResultDTO, {
            id: user.id,
            nickname: user.nickname,
            bio: user.bio,
            email: user.email,
            createdAt: toKSTDate(user.createdAt),
            updatedAt: toKSTDate(user.updatedAt),
        } as ProfileResultDTO);
    }
}
