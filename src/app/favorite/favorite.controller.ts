import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserModel, UserParam } from '../user/public-api';

import { FavoriteResultDTO, GetFavoritesDTO } from './favorite.dto';
import { FavoriteFacade } from './favorite.facade';

@Controller({ version: '1' })
@ApiTags('관심사 정보')
@ApiBearerAuth()
export class FavoriteController {

    constructor(
        private readonly favoriteFace: FavoriteFacade,
    ) {
    }

    @Get()
    @ApiOperation({ summary: '관심사 목록 조회' })
    @ApiResponse({ type: [FavoriteResultDTO] })
    async getFavorites(
        @UserParam() user: UserModel,
        @Query() dto: GetFavoritesDTO,
    ) {
        return this.favoriteFace.getFavorites(user.id, dto);
    }
}
