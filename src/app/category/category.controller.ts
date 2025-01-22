import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Public } from '../auth/public-api';

import { CategoryFacade } from './category.facade';
import { CategoryResultDTO, CreateCategoryDTO } from './category.dto';

@Controller({ version: '1' })
@ApiTags('카테고리 정보')
export class CategoryController {

    constructor(
        private readonly categoryFacade: CategoryFacade,
    ) {
    }

    @Public()
    @Get()
    @ApiOperation({ summary: '카테고리 목록 조회' })
    @ApiResponse({ type: CategoryResultDTO })
    async getCategories() {
        return this.categoryFacade.getCategories();
    }

    @Public()
    @Post()
    @ApiOperation({ summary: '카테고리 생성' })
    async create(@Body() dto: CreateCategoryDTO) {
        return this.categoryFacade.create(dto);
    }
}
