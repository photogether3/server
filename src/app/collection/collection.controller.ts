import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CollectionPaginationDTO, CreateCollectionDTO, UpdateCollectionDTO } from './collection.dto';

@Controller({ version: '1' })
@ApiTags('사진첩')
@ApiBearerAuth()
export class CollectionController {

    @Get()
    @ApiOperation({ summary: '사진첩 목록 조회' })
    @ApiResponse({ type: CollectionPaginationDTO })
    async getCollections() {
        return CollectionPaginationDTO.fromNullData();
    }


    @Post()
    @ApiOperation({ summary: '사진첩 생성' })
    async create(@Body() dto: CreateCollectionDTO) {
        return;
    }

    @Put(':collectionId')
    @ApiOperation({ summary: '사진첩 수정'})
    async update(
        @Param('collectionId') collectionId: string,
        @Body() dto: UpdateCollectionDTO,
    ) {
        return;
    }
}
