import { ApiProperty } from '@nestjs/swagger';

import { PaginationDTO, RequestScopes } from 'src/shared/base';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetPostsDTO {
    @ApiProperty({ description: '조회범위', enum: RequestScopes, default: RequestScopes.ALL })
    readonly scope: RequestScopes = RequestScopes.ALL;
}

export class CreatePost__Metadata {
    @IsNotEmpty()
    @ApiProperty({ description: '메타데이터 텍스트', example: '추출데이터1' })
    readonly content: string;

    @IsNotEmpty()
    @ApiProperty({ description: '공개여부', example: true })
    readonly isPublic: boolean;
}

export class UpdatePostDTO {
    @IsOptional()
    @ApiProperty({ description: '제목', example: '제목입니다.' })
    readonly title: string;

    @IsOptional()
    @ApiProperty({ description: '내용', example: '내용입니다.' })
    readonly content: string;

    @IsNotEmpty()
    @ApiProperty({ description: '매타데이터 목록', type: [CreatePost__Metadata] })
    readonly metadataList: CreatePost__Metadata[];

    @IsNotEmpty()
    @ApiProperty({
        description: '게시물 이미지 파일',
        type: 'string',
        format: 'binary',
    })
    file: Express.Multer.File;
}

export class CreatePostDTO extends UpdatePostDTO {
    @IsNotEmpty()
    @ApiProperty({ description: '사진첩 ID' })
    readonly collectionId: string;
}

export class MovePostsDTO {
    @IsNotEmpty()
    @ApiProperty({ description: '사진첩 ID 목록' })
    readonly collectionIds: string[];
}

export class RemovePostsDTO extends MovePostsDTO {
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

export class PostResultDTO {
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
    readonly metadataList: CreatePost__Metadata[];
}

export class PostPaginationResultDTO extends PaginationDTO<PostResultDTO> {
    @ApiProperty({ type: [PostResultDTO] })
    readonly items: PostResultDTO[];
}
