import { BadRequestException, Injectable } from '@nestjs/common';

import { UserTokenRepository } from '../../infra';
import { UserTokenModel } from '../models/user-token.model';

@Injectable()
export class UserTokenService {

    constructor(
        private readonly userTokenRepository: UserTokenRepository,
    ) {
    }

    /**
     * @todo 유저 ID와 일치하는 유저토큰을 가져옵니다.
     * - 유저토큰이 없는 경우 400에러를 반환합니다.
     */
    async getUserTokenByUserIdOrThrow(userId: string) {
        const userToken = await this.userTokenRepository.findUserTokenByUserId(userId);
        if (!userToken) {
            throw new BadRequestException('인증 토큰이 유효하지 않습니다.');
        }
        return userToken;
    }

    /**
     * @todo refreshToken과 일치하는 유저토큰을 가져옵니다.
     * - 유저토큰이 없는 경우 400에러를 반환합니다.
     */
    async getUserTokenByRefreshTokenOrThrow(refreshToken: string) {
        const userToken = await this.userTokenRepository.findUserTokenByRefreshToken(refreshToken);
        if (!userToken) {
            throw new BadRequestException('인증 토큰이 유효하지 않습니다.');
        }
        return userToken;
    }

    /**
     * @todo 유저토큰을 생성 또는 변경합니다.
     * - 기존에 refreshToken이 있는지 조회
     * - 토큰이 없으면 새로 생성
     * - 토큰이 있으면 새로 발급받은 refreshToken으로 업데이트
     * - 유저토큰 반환
     */
    async createOrUpdate(userId: string, refreshToken: string) {
        let userToken = await this.userTokenRepository.findUserTokenByUserId(userId);
        if (!userToken) userToken = await this.create(userId, refreshToken);
        else await this.update(userToken, refreshToken);
        return userToken;
    }

    /**
     * @todo 유저토큰을 새로운 리프레시토큰으로 업데이트합니다.
     * - 변경된 유저토큰을 반환합니다.
     */
    async update(userToken: UserTokenModel, refreshToken: string) {
        userToken = userToken.withUpdateRefreshToken(refreshToken);
        await this.userTokenRepository.save(userToken);
        return userToken;
    }

    /**
     * @todo 유저토큰을 삭제압니다.
     * - softRemove 적용
     */
    async remove(userToken: UserTokenModel) {
        userToken = userToken.withRemove();
        await this.userTokenRepository.save(userToken);
    }

    /**
     * @todo 유저ID와 일치하는 유저토큰을 삭제압니다.
     * - softRemove 적용
     */
    async removeByUserId(userId: string) {
        let userToken = await this.getUserTokenByUserIdOrThrow(userId);
        userToken = userToken.withRemove();
        await this.userTokenRepository.save(userToken);
    }

    /**
     * @todo 사용자 토큰을 생성하고 DB에 저장합니다.
     * - 생성된 사용자토큰을 반환합니다.
     */
    private async create(userId: string, refreshToken: string) {
        const userToken = UserTokenModel.from({
            userId,
            refreshToken,
        });
        await this.userTokenRepository.save(userToken);
        return userToken;
    }
}
