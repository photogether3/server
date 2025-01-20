import { ApiProperty } from '@nestjs/swagger';

export class JwtResourceDTO {
    @ApiProperty({ description: '액세스토큰' })
    readonly accessToken: string;

    @ApiProperty({ description: '액세스토큰 만료시간' })
    readonly expiresIn: number;

    @ApiProperty({ description: '리프레시토큰' })
    readonly refreshToken: string;
}
