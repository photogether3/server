import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryBodyDto {
    @IsNotEmpty()
    @ApiProperty({ description: '카테고리 ID', example: 'CTGR' })
    readonly categoryId: string;

    @IsNotEmpty()
    @ApiProperty({ description: '카테고리 이름' })
    readonly name: string;
}
