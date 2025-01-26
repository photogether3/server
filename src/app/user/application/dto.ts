import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileWithFileDTO {
    @IsNotEmpty()
    @ApiProperty({ description: '닉네임' })
    readonly nickname: string;

    @IsNotEmpty()
    @ApiProperty({ description: '자기소개' })
    readonly bio: string;

    @IsNotEmpty()
    @ApiProperty({ description: '카테고리 ID 목록', type: String })
    readonly categoryIds: string[];

    @IsOptional()
    @ApiProperty({
        description: '프로필 이미지 파일',
        type: 'string',
        format: 'binary',
    })
    file: Express.Multer.File;
}
