import { ApiProperty } from '@nestjs/swagger';

import { GetFavoriteScopes } from './favorite.enum';
import { IsIn } from 'class-validator';

export class GetFavoriteDTO {
    @IsIn(Object.values(GetFavoriteScopes))
    @ApiProperty({ description: '조회범위', enum: GetFavoriteScopes, default: GetFavoriteScopes.ALL })
    readonly scope: GetFavoriteScopes = GetFavoriteScopes.ALL;
}

/** @Response */

export class FavoriteResultDTO {
    @ApiProperty({ description: '관심사 ID' })
    readonly favoriteId: string;

    @ApiProperty({ description: '관심사명' })
    readonly name: string;
}
