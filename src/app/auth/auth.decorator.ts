import { applyDecorators, createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

export function ApiRefreshTokenHeader() {
    return applyDecorators(
        ApiHeader({
            name: 'x-refresh-token',
            description: '리프레시토큰',
            required: true,
            schema: {
                type: 'string',
                example: 'asdf-zxcv-qwer-fghg',
            },
        }),
    );
}

export const RefreshToken = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest();
        const refreshToken: string = request.headers['x-refresh-token'];
        if (!refreshToken) {
            throw new UnauthorizedException('리프레시토큰이 유효하지 않습니다.');
        }
        return refreshToken;
    },
);
