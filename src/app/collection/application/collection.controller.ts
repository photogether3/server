import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserParam } from '../../user/framework';
import { UserModel } from '../../user/domain';

import { CollectionFacade } from './collection.facade';
import { CreateCollectionDTO, GetCollectionsOptionDTO, UpdateCollectionDTO } from '../domain';
import { CollectionPaginationDTO } from '../infrastructure';

@Controller({ version: '1' })
@ApiTags('사진첩')
@ApiBearerAuth()
export class CollectionController {

    constructor(
        private readonly collectionFacade: CollectionFacade,
    ) {
    }

    @Get()
    @ApiOperation({ summary: '사진첩 목록 조회' })
    @ApiResponse({ type: CollectionPaginationDTO })
    async getCollections(
        @UserParam() user: UserModel,
        @Query() dto: GetCollectionsOptionDTO,
    ) {
        return await this.collectionFacade.getCollections(user.id, dto);
    }

    @Post()
    @ApiOperation({ summary: '사진첩 생성' })
    async create(
        @UserParam() user: UserModel,
        @Body() dto: CreateCollectionDTO,
    ) {
        return this.collectionFacade.create(user.id, dto);
    }

    @Put(':collectionId')
    @ApiOperation({ summary: '사진첩 수정' })
    async update(
        @UserParam() user: UserModel,
        @Param('collectionId') collectionId: string,
        @Body() dto: UpdateCollectionDTO,
    ) {
        return this.collectionFacade.update(user.id, collectionId, dto);
    }
}
