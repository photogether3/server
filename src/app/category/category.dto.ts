import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDTO {
    @IsNotEmpty()
    @ApiProperty({ description: '카테고리 이름' })
    readonly name: string;
}

/** @Responses */

export class CategoryResultDTO {
    @ApiProperty({ description: '카테고리 ID' })
    readonly categoryId: string;

    @ApiProperty({ description: '카테고리 이름' })
    readonly name: string;
}

export class FavoriteCategoryResultDTO {
    @ApiProperty({ description: '카테고리 ID' })
    readonly categoryId: string;

    @ApiProperty({ description: '카테고리 이름' })
    readonly name: string;

    @ApiProperty({ description: '관심카테고리 여부' })
    readonly isFavorite: boolean;
}
