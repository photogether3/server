import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserParam } from '../../user/framework';
import { UserModel } from '../../user/domain';

import { CollectionFacade } from './collection.facade';
import { CollectionPaginationDTO, CreateCollectionDTO, UpdateCollectionDTO } from '../domain';

@Controller({ version: '1' })
@ApiTags('사진첩')
@ApiBearerAuth()
export class CollectionController {

    constructor(
        private readonly collectionFacade: CollectionFacade,
    ) {
    }

    @Get()
    @ApiOperation({ summary: '사진첩 목록 조회 [Draft]' })
    @ApiResponse({ type: CollectionPaginationDTO })
    async getCollections() {
        return CollectionPaginationDTO.fromNullData();
    }

    @Post()
    @ApiOperation({ summary: '사진첩 생성 [Draft]' })
    async create(
        @UserParam() user: UserModel,
        @Body() dto: CreateCollectionDTO,
    ) {
        return this.collectionFacade.create(user.id, dto);
    }

    @Put(':collectionId')
    @ApiOperation({ summary: '사진첩 수정 [Draft]' })
    async update(
        @Param('collectionId') collectionId: string,
        @Body() dto: UpdateCollectionDTO,
    ) {
        return;
    }
}
