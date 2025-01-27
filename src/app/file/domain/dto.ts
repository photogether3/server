import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDto {
    readonly originalFileName: string;
    readonly fileName: string;
    readonly filePath: string;
    readonly mimeType: string;
    readonly rank: number;
}

/////////////////////////////Response////////////////////////////////////

export class FileResultDto {
    @ApiProperty({ description: '파일 그룹 ID' })
    readonly fileGroupId: string;

    @ApiProperty({ description: '파일 URL' })
    readonly fileUrl: string;

    @ApiProperty({ description: '파일 Path' })
    readonly filePath: string;

    @ApiProperty({ description: '원본 파일 이름' })
    readonly originalFileName: string;

    @ApiProperty({ description: '파일 순서' })
    readonly rank: number;
}
