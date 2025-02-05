import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { EnvService } from 'src/shared/env';

import { DiscordColors, DiscordWebHookService } from 'src/shared/third-party';

@Catch(HttpException)
export class AppExceptionFilter implements ExceptionFilter {

    private readonly logger = new Logger(AppExceptionFilter.name);
    private readonly appStatus: 'development' | 'production';

    constructor(
        private readonly envService: EnvService,
        private readonly discordWebHook: DiscordWebHookService,
    ) {
        this.appStatus = this.envService.getAppEnv().status as 'development' | 'production';
    }

    async catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        const signature = exception.name;
        const clientIp = request.headers['x-forwarded-for'] || request.connection.remoteAddress;

        let errorMessage = exception.message ?? '';
        this.logger.error(`[${status}] ${errorMessage} - Request IP: ${clientIp}`, exception.stack);
        if (status < 500 && this.appStatus === 'production') {
            await this.discordWebHook.sendError('🚨 시스템 에러 리포트', {
                endPoint: request.url,
                method: request.method,
                errMsg: errorMessage,
                errCode: status,
            }, DiscordColors.ERROR);
        }

        response
            .status(status)
            .json({
                signature: signature,
                statusCode: status,
                message: errorMessage,
            });
    }
}
