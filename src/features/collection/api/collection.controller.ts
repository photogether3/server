import { BadRequestException, Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserParam } from 'src/features/user/api';
import { UserModel } from 'src/features/user/app';
import {
    CollectionDetailViewModel,
    CollectionPaginationDto,
    ReqCreateCollectionDto,
    ReqGetCollectionsDto,
    ReqUpdateCollectionDto,
} from 'src/features/collection/app';

import { CollectionFacade } from './collection.facade';

@Controller({ path: 'collections', version: '1' })
@ApiTags('사진첩')
@ApiBearerAuth()
export class CollectionController {

    constructor(
        private readonly collectionFacade: CollectionFacade,
    ) {
    }

    @Get()
    @ApiOperation({ summary: '사진첩 목록 조회' })
    @ApiResponse({ type: CollectionPaginationDto })
    async getCollectionViews(
        @UserParam() user: UserModel,
        @Query() dto: ReqGetCollectionsDto,
    ) {
        return await this.collectionFacade.getCollectionViews(user.id, dto);
    }

    @Get(':collectionId')
    @ApiOperation({ summary: '사진첩 상세 조회' })
    @ApiResponse({ type: CollectionDetailViewModel })
    async getCollectionView(
        @UserParam() user: UserModel,
        @Param('collectionId') collectionId: string,
    ) {
        if (!collectionId) throw new BadRequestException('사진첩 아이디를 입력해주세요.');
        return await this.collectionFacade.getCollectionView(user.id, collectionId);
    }

    @Post()
    @ApiOperation({ summary: '사진첩 생성' })
    async create(
        @UserParam() user: UserModel,
        @Body() dto: ReqCreateCollectionDto,
    ) {
        return this.collectionFacade.create(user.id, dto);
    }

    @Put(':collectionId')
    @ApiOperation({ summary: '사진첩 수정' })
    async update(
        @UserParam() user: UserModel,
        @Param('collectionId') collectionId: string,
        @Body() dto: ReqUpdateCollectionDto,
    ) {
        return this.collectionFacade.update(user.id, collectionId, dto);
    }
}
