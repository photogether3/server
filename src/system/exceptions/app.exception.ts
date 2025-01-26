import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';

import { DiscordColors, DiscordWebHookService } from 'src/shared/third-party';

@Catch(HttpException)
export class AppExceptionFilter implements ExceptionFilter {

    private readonly logger = new Logger(AppExceptionFilter.name);

    constructor(
        private readonly discordWebHook: DiscordWebHookService,
    ) {
    }

    async catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        const signature = exception.name;
        const clientIp = request.headers['x-forwarded-for'] || request.connection.remoteAddress;

        let errorMessage = exception.message ?? '';
        if (status >= 400 && status < 500) {
            this.logger.warn(`[${status}] ${errorMessage} - Request IP: ${clientIp}`, exception.stack);
            // await this.discordWebHook.sendError('🍫 사용자 에러 리포트', {
            //     endPoint: request.url,
            //     method: request.method,
            //     errMsg: errorMessage,
            //     errCode: status,
            // }, DiscordColors.WARNING);
        } else {
            errorMessage = exception.message;
            this.logger.error(`[${status}] ${errorMessage} - Request IP: ${clientIp}`, exception.stack);

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
