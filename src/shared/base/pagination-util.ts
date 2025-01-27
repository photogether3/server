import { PaginationDto } from './base.dto';

export class PaginationUtil {
    private readonly page: number;
    private readonly perPage: number;

    /**
     * @desc page, perPage를 필수로 전달받아야합니다.
     * @desc 생성된 인스턴스는 저장된 데이터를 통해 `offset` getter
     * 또는 추가데이터를 주입받아 `PaginationDto` 객체를 생성해주는 `generate` 를 사용할 수 있습니다.
     */
    constructor(page: number, perPage: number) {
        this.page = page;
        this.perPage = perPage;
    }

    get offset() {
        return (this.page - 1) * this.perPage;
    }

    /**
     * @todo `PaginationDto` 타입의 객체를 제공합니다.
     */
    generate<T>(totalItemCount: number, items: T[]): PaginationDto<T> {
        return {
            totalItemCount,
            totalPageCount: Math.ceil(totalItemCount / this.perPage),
            items,
            perPage: this.perPage,
            currentPage: this.page,
        };
    }
}
