import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { FavoriteResultDTO, GetFavoriteDTO } from './favorite.dto';

@Controller({ version: '1' })
@ApiTags('관심사 정보')
export class FavoriteController {

    @Get()
    @ApiBearerAuth()
    @ApiOperation({ summary: '관심사 목록 조회' })
    @ApiResponse({ type: [FavoriteResultDTO] })
    async getFavorites(@Query() dto: GetFavoriteDTO) {
        console.log(dto);
        return [];
    }
}
