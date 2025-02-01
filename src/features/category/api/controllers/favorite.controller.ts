import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserParam } from 'src/features/user/api';
import { UserModel } from 'src/features/user/app';

import { ResCategoryDto, ReqCreateOrUpdateFavoriteDto } from '../../app';
import { FavoriteFacade } from '../facades/favorite.facade';

@Controller({ path: 'favorites', version: '1' })
@ApiTags('관심 카테고리')
@ApiBearerAuth()
export class FavoriteController {

    constructor(
        private readonly favoriteFacade: FavoriteFacade,
    ) {
    }

    @Get()
    @ApiOperation({ summary: '관심있는 카테고리 목록 조회' })
    @ApiResponse({ type: [ResCategoryDto] })
    async getFavoriteCategories(@UserParam() user: UserModel) {
        return await this.favoriteFacade.getFavoriteCategories(user.id);
    }

    @Put()
    @ApiOperation({ summary: '관심 카테고리 일괄 등록 또는 변경' })
    async createOrUpdate(
        @UserParam() user: UserModel,
        @Body() body: ReqCreateOrUpdateFavoriteDto,
    ) {
        return await this.favoriteFacade.createOrUpdate(user.id, body);
    }
}
