import { Injectable } from '@nestjs/common';

import { CategoryRepository } from './category.repository';
import { CategoryModel } from './category.model';

@Injectable()
export class CategoryCoreService {

    constructor(
        private readonly categoryRepository: CategoryRepository,
    ) {
    }

    /**
     * @todo 카테고리 목록을 조회합니다.
     * @return 카테고리모델 목록
     */
    async getCategories() {
        return await this.categoryRepository.findCategories();
    }

    /**
     * @todo 카테고리 모델을 생성, DB에 저장합니다.
     * @return 카테고리모델
     */
    async create(name: string) {
        const category = CategoryModel.from(name);
        await this.categoryRepository.save(category);
        return category;
    }
}
