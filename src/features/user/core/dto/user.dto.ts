import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
    readonly nickname: string;
    readonly bio: string;
    readonly fileGroupId: string;
}

/////////////////////////////Response//////////////////////////////

export class IsEmailTakenResultDto {
    @ApiProperty({ description: '중복여부' })
    readonly isDuplicated: boolean;
}

export class ProfileResultDto {
    @ApiProperty({ description: '사용자 ID' })
    readonly id: string;

    @ApiProperty({ description: '닉네임' })
    readonly nickname: string;

    @ApiProperty({ description: '자기소개' })
    readonly bio: string;

    @ApiProperty({ description: '이메일' })
    readonly email: string;

    @ApiProperty({ description: '프로필 이미지 URL' })
    readonly imageUrl: string;

    @ApiProperty({ description: '생성일' })
    readonly createdAt: Date;

    @ApiProperty({ description: '수정일' })
    readonly updatedAt: Date;

}
