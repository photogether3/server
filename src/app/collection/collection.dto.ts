import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { PaginationDTO } from 'src/shared/base';

export class CreateCollectionDTO {
    @IsNotEmpty({ message: '제목을 입력해 주세요.' })
    @ApiProperty({ description: '제목' })
    readonly title: string;

    @IsNotEmpty({ message: '관심사 ID를 입력해 주세요.' })
    @ApiProperty({ description: '관심사 ID' })
    readonly favoriteId: string;
}

export class UpdateCollectionDTO extends CreateCollectionDTO {}

/** @Response */

export class CollectionResultDTO {
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

