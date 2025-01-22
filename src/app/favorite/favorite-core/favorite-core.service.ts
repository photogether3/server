import { BadRequestException, Injectable } from '@nestjs/common';

import { FavoriteRepository } from './favorite.repository';
import { FavoriteModel } from './favorite.model';

@Injectable()
export class FavoriteCoreService {

    constructor(
        private readonly favoriteRepository: FavoriteRepository,
    ) {
    }

    /**
     * @todo 시스템에 등록된 모든 관심사 목록을 조회합니다.
     * @return 관심사모델 목록
     */
    async getSystemFavorites() {
        return this.favoriteRepository.findFavorites();
    }

    /**
     * @todo 유저의 관심사 목록을 조회합니다.
     * @return 관심사모델 목록
     */
    async getUserFavorites(userId: string) {
        return await this.favoriteRepository.findFavoritesByUserId(userId);
    }

    /**
     * @todo 유저의 특정 관심사를 조회합니다.
     * @throw 관심사가 존재하지 않으면 400 에러
     * @return 관심사모델
     */
    async getUserFavoriteOrThrow(userId: string, favoriteId: string) {
        const result = await this.favoriteRepository.findFavoriteById(userId, favoriteId);
        if (!result) {
            throw new BadRequestException('관심사가 존재하지 않습니다.');
        }
        return result;
    }

    /**
     * @todo 관심사ID 목록만큼 관심사모델을 생성, DB에 저장합니다.
     * @return 관심사모델
     */
    async creates(favoriteIds: string[]) {
        favoriteIds.map(x => this.create(x));
    }

    private create(favoriteId: string) {
        return FavoriteModel.from(favoriteId);
    }
}
