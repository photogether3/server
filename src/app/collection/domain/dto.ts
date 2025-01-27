import { ApiProperty } from '@nestjs/swagger';

import { PaginationDto } from 'src/shared/base';

import { CollectionSortBy, SortOrders } from './enum';

export class GetCollectionsOptionDto {
    readonly userId: string;
    readonly page: number;
    readonly offset: number;
    readonly perPage: number;
    readonly sortBy: CollectionSortBy;
    readonly sortOrder: SortOrders;
}

export class CreateCollectionDto {
    readonly title: string;
    readonly userId: string;
    readonly categoryId: string;
}

export class UpdateCollectionDto {
    readonly title: string;
    readonly categoryId: string;
}

///////////////////////////////////Response///////////////////////////////////////

export class CollectionResultDto {
    @ApiProperty({ description: '사진첩 ID' })
    readonly collectionId: string;

    @ApiProperty({ description: '제목' })
    readonly title: string;

    @ApiProperty({ description: '전체 아이템 개수' })
    readonly totalItemCount: number;

    @ApiProperty({ description: '일부 이미지 URL' })
    readonly imageUrls: string[];
}

export class CollectionPaginationDto extends PaginationDto<CollectionResultDto> {
    @ApiProperty({ type: [CollectionResultDto] })
    readonly items: CollectionResultDto[];
}
