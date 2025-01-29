import { IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostMetadataBodyDto {
    @IsNotEmpty()
    @ApiProperty({ description: '메타데이터 텍스트', example: '추출데이터1' })
    readonly content: string;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ description: '공개여부', example: true })
    readonly isPublic: boolean;
}
