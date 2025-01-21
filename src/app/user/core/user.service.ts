import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { CustomBadRequestException, CustomExceptions } from 'src/shared/error';

import { UserModel } from './user.model';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

    constructor(
        private readonly userRepository: UserRepository
    ) {}

    /**
     * @todo 유저ID를 통해 유저를 조회합니다.
     * - 데이터가 없는 경우 401에러를 반환합니다.
     */
    async getUserByIdOrUnAuthorize(userId: string) {
        const user = await this.userRepository.findUserById(userId);
        if (!user) {
            throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
        }
        return user;
    }

    /**
     * @todo 이메일이 이미 사용중인지 여부를 반환합니다.
     */
    async isEmailTaken(email: string) {
        return !!await this.userRepository.findUserByEmail(email);
    }

    /**
     * @todo 이메일로 회원을 조회합니다.
     * - 데이터가 없을 경우 400에러를 반환합니다.
     */
    async getUserByEmailOrThrow(email: string) {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw new BadRequestException('이메일이 존재하지 않습니다.');
        }
        return user;
    }

    /**
     * @todo 이메일 중복을 검증합니다.
     * - 검증 실패: 400에러를 반환합니다.
     * - 검증 성공: 유저모델을 반환합니다.
     */
    async verifyDuplicateEmail(email: string) {
        const user = await this.userRepository.findUserByEmail(email);
        if (user) {
            throw new BadRequestException('사용중인 계정입니다.');
        }
        return user;
    }

    /**
     * @todo OTP가 유효한지 검증합니다.
     * - 검증 실패: 400에러를 반환합니다.
     * - 검증 성공: 유저모델을 반환합니다.
     */
    async verifyOtp(user: UserModel, otp: string) {
        if (!user.verifyOtp(otp)) {
            throw new BadRequestException('OTP가 유효하지 않습니다.');
        }
        return user;
    }

    /**
     * @todo 아이디, 비밀번호를 검증합니다.
     * - 검증 실패: 400에러를 반환합니다.
     * - 검증 성공: 유저모델을 반환합니다.
     */
    async verifyCredentials(username: string, password: string) {
        const user = await this.userRepository.findUserByEmail(username);
        console.log(user);
        const errMsg = '아이디 또는 비밀번호가 일치하지 않습니다.';
        if (!user) {
            throw new BadRequestException(errMsg);
        }

        if (!user.validatePassword(password)) {
            throw new BadRequestException(errMsg);
        }

        return user;
    }

    /**
     * @todo 이메일이 인증된 회원인지 검증합니다.
     * - 검증 실패: CUSTOM 400에러를 반환합니다.
     * - 검증 성공: 유저모델을 반환합니다.
     */
    async verifyActiveUser(user: UserModel) {
        if (!user.isEmailVerified) {
            throw new CustomBadRequestException(CustomExceptions.VERIFY_EMAIL, '이메일 인증이 필요합니다.');
        }
        return user;
    }

    /**
     * @todo 유저 데이터를 생성하고 DB에 저장합니다.
     * - 유저모델을 반환합니다.
     */
    async create(email: string, password: string) {
        const user = UserModel.from({
            email,
            password,
        });

        await this.userRepository.save(user);

        return user;
    }

    /**
     * @todo OTP 인증번호, 만료시간을 생성하고 DB에 반영합니다.
     * - isClear 파라미터를 true로 보낼 경우 OTP, 만료시간을 제거합니다.
     * - 업데이트 이후 유저모델을 반환합니다.
     */
    async updateOtp(user: UserModel, isClear: boolean = false) {
        if (!isClear) user = user.withGenerateOtp();
        else user = user.withClearOtp();
        await this.userRepository.save(user);
        return user;
    }

    /**
     * @todo 이메일 인증 상태를 `인증됨`으로 업데이트합니다.
     * - 업데이트 이후 유저모델을 반환합니다.
     */
    async updateEmailVerified(user: UserModel) {
        user = user.withUpdateEmailVerified();
        await this.userRepository.save(user);
        return user;
    }

    /**
     * @todo 유저 프로필 정보를 수정합니다.
     * - 닉네임, 자기소개
     * - 업데이트 이후 유저모델을 반환합니다.
     */
    async updateProfile(user: UserModel, nickname: string, bio: string) {
        user = user.withUpdateProfile(nickname, bio);
        await this.userRepository.save(user);
        return user;
    }


    /**
     * @todo 유저의 비밀번호를 변경합니다.
     * - 업데이트 이후 유저모델을 반환합니다.
     */
    async updatePassword(user: UserModel, password: string) {
        user = user.withUpdatePassword(password);
        await this.userRepository.save(user);
        return user;
    }

    /**
     * @todo 유저 계정을 삭제합니다.
     * - 현재 정잭으로 softRemove 적용
     */
    async remove(user: UserModel) {
        user = user.withdraw();
        await this.userRepository.save(user);
    }
}
