import { ApiProperty } from '@nestjs/swagger';

export class FileResultDTO {
    @ApiProperty({ description: '임시저장된 파일 URL' })
    readonly fileUrl: string;
}
