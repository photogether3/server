import { BadRequestException, Injectable } from '@nestjs/common';

import { CategoryRepository } from '../../infra';
import { CategoryModel } from '../models/category.model';
import { CategoryResultDto, CategoryWithFavoriteStatusResultDto } from '../dto/category.dto';

@Injectable()
export class CategoryService {

    constructor(
        private readonly categoryRepository: CategoryRepository,
    ) {
    }

    /**
     * @todo 순수카테고리 모델 목록을 조회합니다.
     */
    async getCategories(): Promise<CategoryModel[]> {
        return await this.categoryRepository.findCategories();
    }

    /**
     * @todo 가공된 카테고리 목록을 조회합니다.
     */
    async getCategoryResults(): Promise<CategoryResultDto[]> {
        const results = await this.categoryRepository.findCategories();
        return results.map(x => ({
            categoryId: x.categoryId,
            name: x.name,
        }) as CategoryResultDto);
    }

    /**
     * @todo 유저의 관심있는 카테고리 목록을 조회합니다.
     */
    async getCategoriesByUserId(userId: string): Promise<CategoryResultDto[]> {
        const results = await this.categoryRepository.findCategoriesByUserId(userId);
        return results.map(x => ({
            categoryId: x.categoryId,
            name: x.name,
        }) as CategoryResultDto);
    }

    /**
     * @todo 관심사여부를 포함한 전체 카테고리 목록을 조회합니다.
     */
    async getCategoriesWithFavoriteStatus(userId: string): Promise<CategoryWithFavoriteStatusResultDto[]> {
        const results = await this.categoryRepository.getCategoriesWithFavoriteStatus(userId);
        return results.map(({ categories, favorites }) => {
            return {
                categoryId: categories.categoryId,
                name: categories.name,
                isFavorite: !!favorites,
            } as CategoryWithFavoriteStatusResultDto;
        });
    }

    /**
     * @todo 특정 카테고리를 조회합니다.
     * @throw 카테고리가 없으면 400 에러처리합니다.
     */
    async getCategoryById(categoryId: string): Promise<CategoryModel> {
        const result = this.categoryRepository.findCategoryById(categoryId);
        if (!result) {
            throw new BadRequestException('카테고리를 찾을 수 없습니다.');
        }
        return result;
    }

    /**
     * @todo 카테고리 목록을 검증합니다.
     * @throw 파라미터의 개수와 조회된 개수가 다를 경우 400 에러처리합니다.
     */
    async verifyCategories(categoryIds: string[]): Promise<void> {
        const results = await this.categoryRepository.findCategoriesByIds(categoryIds);
        if (results.length !== categoryIds.length) {
            throw new BadRequestException('잘못된 카테고리 데이터입니다.');
        }
    }

    /**
     * @todo 카테고리 모델을 생성, DB에 저장합니다.
     */
    async create(categoryId: string, name: string): Promise<CategoryModel> {
        const category = CategoryModel.from(categoryId, name);
        await this.categoryRepository.save(category);
        return category;
    }

    /**
     * @todo 카테고리 모델을 조회, 삭제합니다.
     */
    async remove(category: CategoryModel): Promise<void> {
        category = category.withRemove();
        await this.categoryRepository.save(category);
    }
}
