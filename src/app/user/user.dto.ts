import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, Length, Matches} from "class-validator";
import {plainToInstance} from "class-transformer";

import {USER_RULES, UserModel} from "src/features/user";
import {toKSTDate} from "../../shared/database";

/**
 * ===========
 * Request
 * ===========
 */
export class UpdateNicknameDTO {
    @IsNotEmpty()
    @ApiProperty()
    readonly nickname: string;
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

export class WithdrawDTO {
    @IsNotEmpty({ message: 'OTP 코드가 비어있습니다.' })
    @Length(6, 6, { message: 'OTP는 6자리입니다.' })
    @ApiProperty({ description: 'OTP 코드', example: '123456' })
    readonly otp: string;
}

/**
 * ===========
 * Response
 * ===========
 */
export class IsEmailTakenResultDTO {
    @ApiProperty()
    readonly isDuplicated: boolean;
}

export class ProfileResultDTO {
    @ApiProperty()
    readonly id: string;

    @ApiProperty()
    readonly nickname: string;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly createdAt: Date;

    @ApiProperty()
    readonly updatedAt: Date;

    static from(user: UserModel) {
        return plainToInstance(ProfileResultDTO, {
            id: user.id,
            nickname: user.nickname,
            email: user.email,
            createdAt: toKSTDate(user.createdAt),
            updatedAt: toKSTDate(user.updatedAt),
        } as ProfileResultDTO);
    }
}