import { ApiProperty } from '@nestjs/swagger';

/** @Response */

export abstract class PaginationDTO<T> {

    @ApiProperty({ description: '총 아이템 개수' })
    readonly totalItemCount: number;

    @ApiProperty({ description: '총 페이지 개수' })
    readonly totalPageCount: number;

    @ApiProperty({ description: '현재 페이지 번호' })
    readonly currentPage: number;

    @ApiProperty({ description: '페이지 당 데이터 개수' })
    readonly perPage: number;

    /**
     * 상속받는 도메인모델에서 ApiProperty를 사용해야함
     */
    readonly abstract items: T[];

    static fromNullData() {
        return {
            totalItemCount: 0,
            totalPageCount: 0,
            currentPage: 1,
            perPage: 0,
            items: []
        } as PaginationDTO<any>;
    }
}
