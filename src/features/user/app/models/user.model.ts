import { plainToInstance } from 'class-transformer';
import { nanoid } from 'nanoid';

import { OrmModel } from 'src/shared/database';
import { comparePassword, generateOTP, generateRandomNickname, hashPassword } from '../utils';
import { UpdateProfileDto } from '../dto';

export class UserModel extends OrmModel {
    static OTP_EXPIRED_TIME = 60 * 1000 * 5; // 5분
    readonly id: string;
    readonly fileGroupId: string;
    readonly email: string;
    readonly password: string;
    readonly nickname: string;
    readonly bio: string;
    readonly otp: string;
    readonly otpExpiryDate: Date;
    readonly isEmailVerified: boolean;

    static from(param: Pick<UserModel, 'email' | 'password'>) {
        const now = new Date();
        return plainToInstance(UserModel, {
            id: nanoid(30),
            email: param.email,
            password: hashPassword(param.password),
            nickname: generateRandomNickname(),
            otp: null,
            otpExpiryDate: null,
            isEmailVerified: false,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
        } as UserModel);
    }

    validatePassword(password: string) {
        return comparePassword(password, this.password);
    }

    verifyOtp(otp: string) {
        if (otp !== this.otp) {
            return false;
        }

        return !(!this.otpExpiryDate || this.otpExpiryDate < new Date());
    }

    withGenerateOtp() {
        return plainToInstance(UserModel, {
            ...this,
            otp: generateOTP(),
            otpExpiryDate: new Date(Date.now() + UserModel.OTP_EXPIRED_TIME),
            updatedAt: new Date(),
        } as UserModel);
    }

    withClearOtp() {
        return plainToInstance(UserModel, {
            ...this,
            otp: null,
            otpExpiryDate: null,
            updatedAt: new Date(),
        } as UserModel);
    }

    withUpdateEmailVerified() {
        return plainToInstance(UserModel, {
            ...this,
            isEmailVerified: true,
            updatedAt: new Date(),
        } as UserModel);
    }

    withUpdatePassword(password: string) {
        return plainToInstance(UserModel, {
            ...this,
            password: hashPassword(password),
            updatedAt: new Date(),
        } as UserModel);
    }

    withdraw() {
        const now = new Date();
        return plainToInstance(UserModel, {
            ...this,
            email: this.email + '__' + now.getTime(),
            deletedAt: now,
        } as UserModel);
    }

    withUpdateProfile(dto: UpdateProfileDto) {
        return plainToInstance(UserModel, {
            ...this,
            nickname: dto.nickname,
            bio: dto.bio,
            fileGroupId: dto.fileGroupId,
            updatedAt: new Date(),
        });
    }

    verifyPassword(currentPassword: string) {
        return comparePassword(currentPassword, this.password);
    }
}
