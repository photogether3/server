import { CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { JwtUtilService } from 'src/shared/jwt';

import { UserService } from '../user/public-api';

/**
 * @description
 * 해당 데코레이터를 사용하면 인증 검사를 건너뛰고 컨트롤러에 접근할 수 있습니다.
 */
export function Public() {
    return SetMetadata('public', true);
}

/**
 * @description
 * 요청 객체에서 토큰을 추출하고 유효성을 검사하는 가드입니다.
 *
 * - 모든 요청에 대해 작동되며, 토큰이 유효하지 않으면 요청을 거부합니다.
 * - 요청 해더의 `Bearer` 토큰을 검증합니다.
 * - `Public` 데코레이터가 적용된 요청은 권한 검사를 건너뜁니다.
 */
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector,
        private readonly jwtUtilService: JwtUtilService,
        private readonly userService: UserService,
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();

        if (this.isPublic(context)) {
            return true;
        }

        const token = this.getBearerTokenOrThrow(context);
        const tokenPayload = this.jwtUtilService.verifyJwtToken(token);
        req['user'] = await this.userService.getUserByIdOrUnAuthorize(tokenPayload.sub);
        return true;
    }

    private isPublic(context: ExecutionContext): boolean {
        return this.reflector.getAllAndOverride<boolean>('public', [
            context.getHandler(),
            context.getClass(),
        ]);
    }

    private getBearerTokenOrThrow(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1] as string | undefined;

        if (!token) {
            throw new UnauthorizedException('액세스토큰이 유효하지 않습니다.');
        }

        return token;
    }
}
