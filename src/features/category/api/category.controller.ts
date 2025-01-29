import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Public, UserParam } from '../../user/api';
import { UserModel } from '../../user/core';

import { CategoryFacade } from '../app';
import { CategoryResultDto, CategoryWithFavoriteStatusResultDto, CreateCategoryBodyDto } from '../core';

@Controller({ path: 'categories', version: '1' })
@ApiTags('카테고리')
export class CategoryController {

    constructor(
        private readonly categoryFacade: CategoryFacade,
    ) {
    }

    @Public()
    @Get()
    @ApiOperation({ summary: '전체 카테고리 목록 조회' })
    @ApiResponse({ type: [CategoryResultDto] })
    async getCategories() {
        return await this.categoryFacade.getCategories();
    }

    @Get('with-favorite-status')
    @ApiBearerAuth()
    @ApiOperation({ summary: '전체 카테고리 별 관심사 여부 조회' })
    @ApiResponse({ type: [CategoryWithFavoriteStatusResultDto] })
    async getCategoryWithFavoriteStatus(@UserParam() user: UserModel) {
        return await this.categoryFacade.getCategoryWithFavoriteStatus(user.id);
    }

    @Public()
    @Post()
    @ApiOperation({ summary: '카테고리 생성 (테스트, 관리자용)' })
    async create(@Body() body: CreateCategoryBodyDto) {
        return await this.categoryFacade.create(body);
    }

    @Public()
    @Delete(':categoryId')
    @ApiOperation({ summary: '카테고리 삭제 (테스트, 관리자용)' })
    async remove(@Param('categoryId') categoryId: string) {
        return await this.categoryFacade.remove(categoryId);
    }
}
