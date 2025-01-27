import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

import { GetBaseQueryDto, PaginationDto, BaseSortBy } from 'src/shared/base';

import { CreatePostMetadataBodyDto } from './post-metadata/dto';

export class GetPostsQueryDto extends GetBaseQueryDto {
    @IsOptional()
    @IsIn(Object.values(BaseSortBy))
    @ApiProperty({ description: '정렬대상', enum: BaseSortBy, default: BaseSortBy.CREATED_AT })
    readonly sortBy: BaseSortBy;
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

    @IsNotEmpty()
    @ApiProperty({ description: '매타데이터 목록', type: [CreatePostMetadataBodyDto] })
    readonly metadataList: CreatePostMetadataBodyDto[];

    @IsNotEmpty()
    @ApiProperty({
        description: '게시물 이미지 파일',
        type: 'string',
        format: 'binary',
    })
    file: Express.Multer.File;
}

export class MovePostsBodyDto {
    @IsNotEmpty()
    @ApiProperty({ description: '사진첩 ID 목록' })
    readonly collectionIds: string[];
}

export class RemovePostsBodyDto extends MovePostsBodyDto {
}

/////////////////////////////////////Response////////////////////////////////////////

export class PostResult__Metadata {
    @ApiProperty({ description: '메타데이터 텍스트', example: '추출데이터1' })
    readonly content: string;

    @ApiProperty({ description: '공개여부', example: true })
    readonly isPublic: boolean;
}

export class PostResult__Favorite {
    @ApiProperty({ description: '관심사 ID' })
    readonly favoriteId: string;

    @ApiProperty({ description: '이름' })
    readonly name: boolean;
}

export class PostResult__Collection {
    @ApiProperty({ description: '컬랙션 ID' })
    readonly collectionId: string;

    @ApiProperty({ description: '제목' })
    readonly title: boolean;
}

export class PostResultDto {
    @ApiProperty({ description: '게시물 ID' })
    readonly postId: string;

    @ApiProperty({ description: '제목' })
    readonly title: string;

    @ApiProperty({ description: '내용' })
    readonly content: string;

    @ApiProperty({ description: '생성일' })
    readonly createdAt: Date;

    @ApiProperty({ description: '수정일' })
    readonly updatedAt: Date;

    @ApiProperty({ description: '관심사 정보', type: PostResult__Favorite })
    readonly favorite: PostResult__Favorite;

    @ApiProperty({ description: '사진첩 정보', type: PostResult__Collection })
    readonly collection: PostResult__Collection;

    @ApiProperty({ description: '메타데이터 목록', type: [PostResult__Metadata] })
    readonly metadataList: CreatePostMetadataBodyDto[];
}

export class PostPaginationResultDTO extends PaginationDto<PostResultDto> {
    @ApiProperty({ type: [PostResultDto] })
    readonly items: PostResultDto[];
}
