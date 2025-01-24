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
     * @todo 기존 데이터셋을 비교하여 새로운 데이터는 생성, 삭제되는 데이터는 제거 시킵니다.
     * @warning 한 개 이상의 기능을 수행합니다.
     * @warning 외부 트랜잭션 처리가 필요합니다.
     */
    async createOrUpdate(userId: string, categoryIds: string[]) {
        const oldFavorites = await this.favoriteRepository.findFavoritesByUserId(userId);
        const newFavorites = categoryIds.map(x => FavoriteModel.from(userId, x));

        const toDelete = oldFavorites
            .filter(x => !newFavorites.some(y => x.categoryId === y.categoryId));

        const toCreate = newFavorites
            .filter(x => !oldFavorites.some(y => x.categoryId === y.categoryId));

        if (toDelete.length > 0) await this.favoriteRepository.removes(toDelete);
        if (toCreate.length > 0) await this.favoriteRepository.saves(toCreate);
    }
}
