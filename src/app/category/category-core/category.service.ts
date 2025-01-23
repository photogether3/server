import { BadRequestException, Injectable } from '@nestjs/common';

import { CategoryRepository } from './category.repository';
import { CategoryModel } from './category.model';

@Injectable()
export class CategoryService {

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
     * @todo 카테고리 ID 목록을 검사합니다.
     * @throw 파라미터 개수와 조회된 데이터 크기가 다르면 예외처리합니다.
     * @return void
     */
    async verifyCategories(categoryIds: string[]) {
        const results = await this.categoryRepository.findCategoriesByIds(categoryIds);
        if (categoryIds.length !== results.length) {
            throw new BadRequestException('잘못된 데이터입니다.');
        }
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
