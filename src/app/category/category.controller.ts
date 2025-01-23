import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Public } from '../auth/public-api';
import { UserModel, UserParam } from '../user/public-api';

import { CategoryFacade } from './category.facade';
import { CategoryResultDTO, CreateCategoryDTO, FavoriteCategoryResultDTO } from './category.dto';

@Controller({ version: '1' })
@ApiTags('카테고리 정보')
export class CategoryController {

    constructor(
        private readonly categoryFacade: CategoryFacade,
    ) {
    }

    @Public()
    @Get()
    @ApiOperation({ summary: '전체 카테고리 목록 조회' })
    @ApiResponse({ type: CategoryResultDTO })
    async getCategories() {
        return this.categoryFacade.getCategories();
    }

    @Get('favorites')
    @ApiBearerAuth()
    @ApiOperation({ summary: '관심 카테고리 목록 조회' })
    @ApiResponse({ type: FavoriteCategoryResultDTO })
    async getFavorites(@UserParam() user: UserModel) {
        return this.categoryFacade.getFavorites(user.id);
    }

    @Public()
    @Post()
    @ApiOperation({ summary: '카테고리 생성[테스트용, 관리자 전용]' })
    async create(@Body() dto: CreateCategoryDTO) {
        return this.categoryFacade.create(dto);
    }
}
