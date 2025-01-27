import {
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

import { UserParam } from '../../user/framework';
import { UserModel } from '../../user/domain';

import {
    CreatePostBodyDto,
    GetPostsQueryDto,
    MovePostsBodyDto,
    PostPaginationResultDTO,
    RemovePostsBodyDto,
    UpdatePostBodyDto,
} from './request-dto';
import { PostFacade } from './post.facade';

@Controller({ version: '1' })
@ApiTags('게시물 정보')
@ApiBearerAuth()
export class PostController {

    constructor(
        private readonly postFacade: PostFacade,
    ) {
    }

    @Get()
    @ApiOperation({ summary: '게시물 목록 조회 [Draft]' })
    @ApiResponse({ type: PostPaginationResultDTO })
    async getPosts(@Query() dto: GetPostsQueryDto) {
        return [];
    }

    @Post()
    @ApiOperation({ summary: '게시물 생성 [Draft]' })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @UserParam() user: UserModel,
        @Body() dto: CreatePostBodyDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        dto.file = file;
        return await this.postFacade.create(user.id, dto);
    }

    @Put(':postId')
    @ApiOperation({ summary: '게시물 수정 [Draft]' })
    async update(
        @Param('postId') postId: string,
        @UserParam() user: UserModel,
        @Body() dto: UpdatePostBodyDto,
    ) {
        return;
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
    @ApiOperation({ summary: '게시물 단건/일괄 삭제 [Draft]' })
    async remove(
        @UserParam() user: UserModel,
        @Body() dto: RemovePostsBodyDto,
    ) {
        return;
    }
}
