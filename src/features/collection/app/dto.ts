import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

import { GetBaseQueryDto, PaginationDto } from 'src/shared/base';

import { CollectionSortBy } from './enum';
import { CollectionViewModel } from './models/collection.view-model';

export class ReqGetCollectionsDto extends GetBaseQueryDto {
    @IsOptional()
    @IsIn(Object.values(CollectionSortBy))
    @ApiProperty({ description: '정렬대상', enum: CollectionSortBy, default: CollectionSortBy.CREATED_AT })
    override sortBy: CollectionSortBy;
}

export class ReqCreateCollectionDto {
    @IsNotEmpty({ message: '제목을 입력해 주세요.' })
    @ApiProperty({ description: '제목' })
    readonly title: string;

    @IsNotEmpty({ message: '카테고리 ID를 입력해 주세요.' })
    @ApiProperty({ description: '관심사 ID' })
    readonly categoryId: string;
}

export class ReqUpdateCollectionDto {
    @IsNotEmpty({ message: '제목을 입력해 주세요.' })
    @ApiProperty({ description: '제목' })
    readonly title: string;

    @IsNotEmpty({ message: '카테고리 ID를 입력해 주세요.' })
    @ApiProperty({ description: '관심사 ID' })
    readonly categoryId: string;
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

export class CollectionPaginationDto extends PaginationDto<CollectionViewModel> {
    @ApiProperty({ type: [CollectionViewModel] })
    readonly items: CollectionViewModel[];
}
