import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestException, Logger, Type } from '@nestjs/common';

import { validationExceptionFactory } from './validation.factory';

export class FormDataTranslator {

    /**
     * @todo 객체배열([{}]) 형식의 json stringify 데이터를 dto 클래스 목록으로 인스턴스화합니다.
     * @todo dto의 class-validator를 기준으로 유효성 검증을 처리합니다.
     * @throw json 형식이 아닌경우 400 에러처리합니다.
     * @throw 유효성 검증에 실패할 경우 400 에러처리합니다.
     */
    static async jsonStringifyToDtos<T>(type: Type<T>, stringify: string): Promise<T[]> {
        let _dtos: any;
        try {
            _dtos = JSON.parse(stringify);
        } catch (err) {
            Logger.log(err);
            throw new BadRequestException('잘못된 json 형식의 데이터입니다.');
        }

        return await Promise.all(
            _dtos.map(async m => {
                const result: Object = plainToInstance(type, m);
                const errors = await validate(result);
                if (errors.length > 0) {
                    throw validationExceptionFactory(errors);
                }
                return result;
            }),
        );
    }
}
