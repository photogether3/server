import { IsNotEmpty, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { USER_RULES } from '../../user/domain';

export class LoginDTO {
    @IsNotEmpty({ message: '이메일은 필수 입력 항목입니다.' })
    @Matches(USER_RULES.email.regex, { message: USER_RULES.email.regexErrMsg })
    @ApiProperty({ description: '이메일', example: 'test@gmail.com' })
    readonly email: string;

    @IsNotEmpty({ message: '비밀번호는 필수 입력 항목입니다.' })
    @ApiProperty({ description: '비밀번호', example: '1q2w3e1!@' })
    readonly password: string;
}

export class RegisterDTO {

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

export class GenerateOtpDTO {

    @IsNotEmpty({ message: '이메일은 필수 입력 항목입니다.' })
    @Matches(USER_RULES.email.regex, { message: USER_RULES.email.regexErrMsg })
    @ApiProperty({ description: '이메일', example: 'test@gmail.com' })
    readonly email: string;
}

export class VerifyOtpDTO {

    @IsNotEmpty({ message: '이메일은 필수 입력 항목입니다.' })
    @Matches(USER_RULES.email.regex, { message: USER_RULES.email.regexErrMsg })
    @ApiProperty({ description: '이메일', example: 'test@gmail.com' })
    readonly email: string;

    @IsNotEmpty({ message: 'OTP 코드가 비어있습니다.' })
    @Length(6, 6, { message: 'OTP는 6자리입니다.' })
    @ApiProperty({ description: 'OTP 코드', example: '123456' })
    readonly otp: string;
}
