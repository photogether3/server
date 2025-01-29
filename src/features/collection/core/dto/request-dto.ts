import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

import { GetBaseQueryDto } from 'src/shared/base';

import { CollectionSortBy } from '../enum';

export class GetCollectionsQueryDto extends GetBaseQueryDto {
    @IsOptional()
    @IsIn(Object.values(GetCollectionsQueryDto))
    @ApiProperty({ description: '정렬대상', enum: CollectionSortBy, default: CollectionSortBy.CREATED_AT })
    override sortBy: CollectionSortBy;
}

export class CreateCollectionBodyDto {
    @IsNotEmpty({ message: '제목을 입력해 주세요.' })
    @ApiProperty({ description: '제목' })
    readonly title: string;

    @IsNotEmpty({ message: '카테고리 ID를 입력해 주세요.' })
    @ApiProperty({ description: '관심사 ID' })
    readonly categoryId: string;
}

export class UpdateCollectionBodyDto {
    @IsNotEmpty({ message: '제목을 입력해 주세요.' })
    @ApiProperty({ description: '제목' })
    readonly title: string;

    @IsNotEmpty({ message: '카테고리 ID를 입력해 주세요.' })
    @ApiProperty({ description: '관심사 ID' })
    readonly categoryId: string;
}
