import {Injectable, Logger} from "@nestjs/common";
import {EnvService} from "../../env";
import axios from "axios";

export enum DiscordColors {
    // 에러 레벨
    CRITICAL = 0x990000,  // 진한 빨강 (심각한 시스템 에러)
    ERROR = 0xFF0000,     // 빨강 (500대 에러)
    WARNING = 0xFFA500,   // 주황 (400대 에러)
    INFO = 0x2196F3,      // 파랑 (정보성)
    SUCCESS = 0x4CAF50,   // 초록 (성공)

    // 세부 상태코드
    BAD_REQUEST = 0xFFC107,      // 노란주황 (400)
    UNAUTHORIZED = 0xFF9800,      // 주황 (401)
    FORBIDDEN = 0xFF5722,        // 붉은주황 (403)
    NOT_FOUND = 0xF44336,        // 연빨강 (404)
    SERVER_ERROR = 0xB71C1C,     // 진한 빨강 (500)
    BAD_GATEWAY = 0x880E4F,      // 진한 자주 (502)
    SERVICE_UNAVAILABLE = 0x4A148C // 진한 보라 (503)
}

export type DiscordError = {
    readonly endPoint: string;
    readonly method: string;
    readonly errMsg: string;
    readonly errCode: number;
}

@Injectable()
export class DiscordWebHookService {

    private readonly logger = new Logger(DiscordWebHookService.name);
    private readonly url: string;

    constructor(
        private readonly envService: EnvService
    ) {
        this.url = this.envService.getDiscordEnv().url;
    }

    async sendMessage(title: string, color?:DiscordColors) {
        try {
            const message = {
                embeds: [{
                    title,
                    color: color ?? DiscordColors.INFO,
                    timestamp: new Date().toISOString()
                }]
            };

            await axios.post(this.url, message);
        } catch (error) {
            this.logger.error('Failed to send error to Discord', error);
        }
    }

    async sendError(title: string, data: DiscordError, color?:DiscordColors) {
        try {
            const message = {
                embeds: [{
                    title,
                    color: color ?? DiscordColors.ERROR,
                    fields: [
                        {
                            name: 'End-Point',
                            value: `${data.method}:${data.endPoint}`,
                            inline: true
                        },
                        {
                            name: 'Error Code',
                            value: data.errCode ?? 500,
                            inline: true
                        },
                        {
                            name: 'Error Report',
                            value: data.errMsg,
                            inline: true
                        },
                    ],
                    timestamp: new Date().toISOString()
                }]
            };

            await axios.post(this.url, message);
        } catch (error) {
            console.log(error.message);
            this.logger.error('Failed to send error to Discord', error);
        }
    }
}
