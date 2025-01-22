import { BadRequestException, Injectable } from '@nestjs/common';

import { FavoriteRepository } from './favorite.repository';

@Injectable()
export class FavoriteCoreService {

    constructor(
        private readonly favoriteRepository: FavoriteRepository,
    ) {
    }

    /**
     * @todo 관심사ID를 통해 관심사를 조회합니다.
     * @throw 관심사가 존재하지 않으면 400 에러
     * @return 관심사모델
     */
    async getFavoriteOrThrow(favoriteId: string) {
        const result = await this.favoriteRepository.findFavoriteById(favoriteId);
        if (!result) {
            throw new BadRequestException('관심사가 존재하지 않습니다.');
        }
        return result;
    }
}
