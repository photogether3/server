import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { FavoriteResultDTO, GetFavoritesDTO } from './favorite.dto';

@Controller({ version: '1' })
@ApiTags('관심사 정보')
@ApiBearerAuth()
export class FavoriteController {

    @Get()
    @ApiOperation({ summary: '관심사 목록 조회 [Draft]' })
    @ApiResponse({ type: [FavoriteResultDTO] })
    async getFavorites(@Query() dto: GetFavoritesDTO) {
        console.log(dto);
        return [];
    }
}
