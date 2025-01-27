import { ApiProperty } from '@nestjs/swagger';

//////////////////////////////////////Response////////////////////////////////////////

export class CategoryResultDto {
    @ApiProperty({ description: '카테고리 ID' })
    readonly categoryId: string;

    @ApiProperty({ description: '카테고리 이름' })
    readonly name: string;
}

export class CategoryWithFavoriteStatusResultDto {
    @ApiProperty({ description: '카테고리 ID' })
    readonly categoryId: string;

    @ApiProperty({ description: '카테고리 이름' })
    readonly name: string;

    @ApiProperty({ description: '관심카테고리 여부' })
    readonly isFavorite: boolean;
}
