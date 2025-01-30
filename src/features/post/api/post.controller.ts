import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Query,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { FormDataTranslator } from 'src/shared/validations';

import { UserParam } from '../../user/api';
import { UserModel } from '../../user/core';

import {
    CreatePostBodyDto,
    CreatePostMetadataBodyDto,
    GetPostsQueryDto,
    MovePostsBodyDto,
    PostPaginationResultDTO,
    RemovePostsBodyDto,
    UpdatePostBodyDto,
} from '../core';
import { PostFacade } from '../app';

@Controller({ version: '1' })
@ApiTags('게시물 정보')
@ApiBearerAuth()
export class PostController {

    constructor(
        private readonly postFacade: PostFacade,
    ) {
    }

    @Get()
    @ApiOperation({ summary: '게시물 목록 조회' })
    @ApiResponse({ type: PostPaginationResultDTO })
    async getPostViews(
        @UserParam() user: UserModel,
        @Query() dto: GetPostsQueryDto,
    ) {
        return this.postFacade.getPostViews(user.id, dto);
    }

    @Post()
    @ApiOperation({ summary: '게시물 생성' })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @UserParam() user: UserModel,
        @Body() dto: CreatePostBodyDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        if (!file) {
            throw new BadRequestException('파일을 등록해 주세요.');
        }
        dto.file = file;
        const metadataDtos = await FormDataTranslator.jsonStringifyToDtos(
            CreatePostMetadataBodyDto,
            dto.metadataStringify,
        );
        return await this.postFacade.create(user.id, dto, metadataDtos);
    }

    @Put(':postId')
    @ApiOperation({ summary: '게시물 수정' })
    async update(
        @Param('postId') postId: string,
        @UserParam() user: UserModel,
        @Body() dto: UpdatePostBodyDto,
    ) {
        return await this.postFacade.update(postId, user.id, dto);
    }

    @Patch('move')
    @ApiOperation({ summary: '게시물 단건/일괄 다른 사진첩으로 이동 [Draft]' })
    async moveToOtherCollection(
        @UserParam() user: UserModel,
        @Body() dto: MovePostsBodyDto,
    ) {
        return;
    }

    @Delete()
    @ApiOperation({ summary: '게시물 단건/일괄 삭제' })
    async remove(
        @UserParam() user: UserModel,
        @Body() dto: RemovePostsBodyDto,
    ) {
        return this.postFacade.removes(user.id, dto);
    }
}
