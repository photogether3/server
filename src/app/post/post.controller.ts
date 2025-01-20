import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserModel, UserParam } from 'src/features/user';

import {
    CreatePostDTO,
    GetPostsDTO,
    MovePostsDTO,
    PostPaginationResultDTO,
    RemovePostsDTO,
    UpdatePostDTO,
} from './post.dto';

@Controller({ version: '1' })
@ApiTags('게시물 정보')
@ApiBearerAuth()
export class PostController {

    @Get()
    @ApiOperation({ summary: '게시물 목록 조회 [Draft]' })
    @ApiResponse({ type: PostPaginationResultDTO })
    async getPosts(@Query() dto: GetPostsDTO) {
        return [];
    }

    @Post()
    @ApiOperation({ summary: '게시물 생성 [Draft]' })
    async create(
        @UserParam() user: UserModel,
        @Body() dto: CreatePostDTO,
    ) {
        return;
    }

    @Put(':postId')
    @ApiOperation({ summary: '게시물 수정 [Draft]' })
    async update(
        @Param('postId') postId: string,
        @UserParam() user: UserModel,
        @Body() dto: UpdatePostDTO,
    ) {
        return;
    }

    @Patch('move')
    @ApiOperation({ summary: '게시물 단건/일괄 다른 사진첩으로 이동 [Draft]' })
    async moveToOtherCollection(
        @UserParam() user: UserModel,
        @Body() dto: MovePostsDTO,
    ) {
        return;
    }

    @Delete()
    @ApiOperation({ summary: '게시물 단건/일괄 삭제 [Draft]' })
    async remove(
        @UserParam() user: UserModel,
        @Body() dto: RemovePostsDTO,
    ) {
        return;
    }
}
