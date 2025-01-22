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
     * @todo 유저의 관심사 목록을 조회합니다.
     * @return 관심사 모델 목록
     */
    async getUserFavorites(userId: string) {
        return await this.favoriteRepository.findFavorites(userId);
    }

    /**
     * @todo 유저의 특정 관심사를 조회합니다.
     * @throw 관심사가 존재하지 않으면 400 에러
     * @return 관심사 모델
     */
    async getUserFavoriteOrThrow(userId: string, favoriteId: string) {
        const result = await this.favoriteRepository.findFavorite(userId, favoriteId);
        if (!result) {
            throw new BadRequestException('관심사가 존재하지 않습니다.');
        }
        return result;
    }

    /**
     * @todo 카테고리ID 목록만큼 관심사모델을 생성, DB에 저장합니다.
     * @return 관심사 모델 목록
     */
    async creates(userId: string, categoryIds: string[]) {
        const favorites = categoryIds.map(x => FavoriteModel.from(userId, x));
        console.log(favorites);
        await this.favoriteRepository.saves(favorites);
        return favorites;
    }
}
