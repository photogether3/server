import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

import { CollectionSortBy, SortOrders } from '../infrastructure';

export class GetCollectionsOptionDTO {
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    @ApiProperty({ description: '페이지 번호', default: 1 })
    readonly page: number = 1;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    @ApiProperty({ description: '페이지 번호', default: 10 })
    readonly perPage: number = 10;

    @IsOptional()
    @IsIn(Object.values(CollectionSortBy))
    @ApiProperty({ description: '정렬대상', enum: CollectionSortBy, default: CollectionSortBy.CREATED_AT })
    readonly sortBy: CollectionSortBy;

    @IsOptional()
    @IsIn(Object.values(SortOrders))
    @ApiProperty({ description: '정렬방식', enum: SortOrders, default: SortOrders.DESC })
    readonly sortOrder: SortOrders = SortOrders.DESC;
}

export class CreateCollectionDTO {
    @IsNotEmpty({ message: '제목을 입력해 주세요.' })
    @ApiProperty({ description: '제목' })
    readonly title: string;

    @IsNotEmpty({ message: '카테고리 ID를 입력해 주세요.' })
    @ApiProperty({ description: '관심사 ID' })
    readonly categoryId: string;
}

export class UpdateCollectionDTO extends CreateCollectionDTO {
}
