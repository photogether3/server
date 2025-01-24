import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserModel, UserParam } from '../../../user/public-api';

import { CategoryResultDTO, CreateOrUpdateFavoriteDTO } from '../../domain';
import { FavoriteFacade } from './favorite.facade';


@Controller({ path: 'favorites', version: '1' })
@ApiTags('관심 카테고리')
export class FavoriteController {

    constructor(
        private readonly favoriteFacade: FavoriteFacade,
    ) {
    }

    @Get()
    @ApiOperation({ summary: '관심있는 카테고리 목록 조회' })
    @ApiResponse({ type: [CategoryResultDTO] })
    async getFavoriteCategories(@UserParam() user: UserModel) {
        return await this.favoriteFacade.getFavoriteCategories(user.id);
    }

    @Put()
    @ApiOperation({ summary: '관심 카테고리 일괄 등록 또는 변경' })
    async createOrUpdate(
        @UserParam() user: UserModel,
        @Body() dto: CreateOrUpdateFavoriteDTO,
    ) {
        return await this.favoriteFacade.createOrUpdate(user.id, dto);
    }
}
