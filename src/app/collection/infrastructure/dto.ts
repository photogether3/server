import { ApiProperty } from '@nestjs/swagger';

import { PaginationDTO } from 'src/shared/base';

import { CollectionSortBy, SortOrders } from './enum';

export class FindCollectionsOptionDTO {
  readonly userId: string;
  readonly page: number;
  readonly offset: number;
  readonly perPage: number;
  readonly sortBy: CollectionSortBy;
  readonly sortOrder: SortOrders;
}

/////////////////////////////Response//////////////////////////////////

export class CollectionResultDTO {
  @ApiProperty({ description: '사진첩 ID' })
  readonly collectionId: string;

  @ApiProperty({ description: '제목' })
  readonly title: string;

  @ApiProperty({ description: '전체 아이템 개수' })
  readonly totalItemCount: number;

  @ApiProperty({ description: '일부 이미지 URL' })
  readonly imageUrls: string[];
}

export class CollectionPaginationDTO extends PaginationDTO<CollectionResultDTO> {
  @ApiProperty({ type: [CollectionResultDTO] })
  readonly items: CollectionResultDTO[];
}
