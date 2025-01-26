import { BadRequestException, Injectable } from '@nestjs/common';

import { FavoriteModel } from './favorite.model';
import { FavoriteRepository } from '../../infrastructure';

@Injectable()
export class FavoriteService {

    constructor(
        private readonly favoriteRepository: FavoriteRepository,
    ) {
    }

    /**
     * @todo 내 관심사가 맞는지 확인합니다.
     * @throw 관심사가 아니면 400 에러처리합니다.
     */
    async getFavorite(userId: string, categoryId: string): Promise<FavoriteModel> {
        const result = await this.favoriteRepository.findFavoritesByUserIdWithCategoryId(userId, categoryId);
        if (!result) {
            throw new BadRequestException('등록되지 않은 관심 카테고리 입니다.');
        }
        return result;
    }

    /**
     * @todo 기존 데이터셋을 비교하여 새로운 데이터는 생성, 삭제되는 데이터는 제거 시킵니다.
     * @warning 한 개 이상의 기능을 수행합니다.
     * @warning 외부 트랜잭션 처리가 필요합니다.
     */
    async createOrUpdate(userId: string, categoryIds: string[]): Promise<void> {
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
