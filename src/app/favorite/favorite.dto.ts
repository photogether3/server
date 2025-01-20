import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

import { RequestScopes } from 'src/shared/base';

export class GetFavoritesDTO {
    @IsIn(Object.values(RequestScopes))
    @ApiProperty({ description: '조회범위', enum: RequestScopes, default: RequestScopes.USER })
    readonly scope: RequestScopes = RequestScopes.USER;
}

/** @Response */

export class FavoriteResultDTO {
    @ApiProperty({ description: '관심사 ID' })
    readonly favoriteId: string;

    @ApiProperty({ description: '관심사명' })
    readonly name: string;
}
