import { HttpException, HttpStatus } from '@nestjs/common';

export enum CustomExceptions {
    SESSION_EXPIRES = 'SESSION_EXPIRES',
    NEED_REFRESH = 'NEED_REFRESH',
    VERIFY_EMAIL = 'VERIFY_EMAIL',
}

/**
 * @description
 * HttpException 기능을 상속받는 커스텀 익셉션
 *
 * - 클라이언트와 별도의 코드로 소통이 필요할 경우 사용
 * -
 */
export class CustomBadRequestException extends HttpException {

    readonly name: string;

    constructor(signature: CustomExceptions, response: string | Record<string, any>) {
        super(response, HttpStatus.BAD_REQUEST);
        this.name = signature;
    }
}
