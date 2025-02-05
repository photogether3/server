import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { BaseSortBy, GetBaseQueryDto, PaginationDto } from 'src/shared/base';
import { CreatePostMetadataBodyDto } from './post-metadata.dto';
import { PostViewModel } from '../view-models/post.view-model';

export class ReqGetPostsDto extends GetBaseQueryDto {
    @IsOptional()
    @IsIn(Object.values(BaseSortBy))
    @ApiProperty({ description: '정렬대상', enum: BaseSortBy, default: BaseSortBy.CREATED_AT })
    readonly sortBy: BaseSortBy;

    @IsNotEmpty()
    @ApiProperty({ description: '사진첩 ID' })
    readonly collectionId: string;
}

export class CreatePostBodyDto {
    @IsNotEmpty()
    @ApiProperty({ description: '사진첩 ID' })
    readonly collectionId: string;

    @IsOptional()
    @ApiProperty({ description: '제목', example: '제목입니다.' })
    readonly title: string;

    @IsOptional()
    @ApiProperty({ description: '내용', example: '내용입니다.' })
    readonly content: string;

    @IsOptional()
    @ApiProperty({
        description: '매타데이터 json.stringify 형식. example 참고 필수 ',
        type: 'string',
        example: JSON.stringify([{ content: 'hello', isPublic: true }, { content: 'world', isPublic: true }]),
    })
    readonly metadataStringify: string;

    @IsOptional()
    @ApiProperty({
        description: '게시물 이미지 파일',
        type: 'string',
        format: 'binary',
    })
    file: Express.Multer.File;
}

export class CreatePostDto {
    readonly collectionId: string;
    readonly fileGroupId: string;
    readonly title: string;
    readonly content: string;
}

export class UpdatePostBodyDto {
    @IsOptional()
    @ApiProperty({ description: '제목', example: '제목입니다.' })
    readonly title: string;

    @IsOptional()
    @ApiProperty({ description: '내용', example: '내용입니다.' })
    readonly content: string;

    @IsOptional()
    @IsArray()
    @Type(() => CreatePostMetadataBodyDto)
    @ValidateNested({ each: true })
    @ApiProperty({ description: '매타데이터 목록', type: [CreatePostMetadataBodyDto] })
    readonly metadataList: CreatePostMetadataBodyDto[];
}

export class UpdatePostDto {
    readonly title: string;
    readonly content: string;
}

export class MovePostsBodyDto {
    @IsNotEmpty()
    @IsArray()
    @ApiProperty({ description: '게시물 ID 목록' })
    readonly postIds: string[];

    @IsNotEmpty()
    @ApiProperty({ description: '사진첩 ID' })
    readonly collectionId: string;
}

export class RemovePostsBodyDto {
    @IsNotEmpty()
    @IsArray()
    @ApiProperty({ description: '게시물 ID 목록' })
    readonly postIds: string[];
}

/////////////////////////////////////Response////////////////////////////////////////

export class PostPaginationResultDTO extends PaginationDto<PostViewModel> {
    @ApiProperty({ type: [PostViewModel] })
    readonly items: PostViewModel[];
}
