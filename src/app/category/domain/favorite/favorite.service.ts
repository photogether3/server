import { Injectable } from '@nestjs/common';

import { FavoriteModel } from './favorite.model';
import { FavoriteRepository } from './favorite.repository';

@Injectable()
export class FavoriteService {

    constructor(
        private readonly favoriteRepository: FavoriteRepository,
    ) {
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
