import {Injectable, UnauthorizedException} from "@nestjs/common";
import * as jwt from 'jsonwebtoken';

import {EnvService} from "../env";
import {JwtResource} from "./types";

@Injectable()
export class JwtUtilService {

    private readonly secret: string;
    private readonly expiresIn: number;

    constructor(
        private readonly envService: EnvService
    ) {
        const { secret, expiresIn } = this.envService.getJwtEnv();
        this.secret = secret;
        this.expiresIn = expiresIn;
    }

    /**
     * @todo 엑세스토큰, 엑세스토큰 만료시간, 리프레시토큰을 발급합니다.
     */
    getTokens(sub: string, payload?: Object) {
        const accessToken: string = this.generateJwtToken(sub, payload);
        const expiresIn: number = this.getJwtExpiresIn(accessToken);
        const refreshToken: string = this.generateOpaqueToken();
        return { accessToken, expiresIn, refreshToken } as JwtResource;
    }

    verifyJwtToken(token: string): jwt.JwtPayload {
        try {
            return jwt.verify(token, this.secret) as jwt.JwtPayload;
        } catch (err) {
            throw new UnauthorizedException(err);
        }
    }

    private generateOpaqueToken(): string {
        return crypto.randomUUID();
    }

    private generateJwtToken(sub: string, payload?: Object): string {
        return jwt.sign(payload ?? {}, this.secret, {
            expiresIn: this.expiresIn,
            subject: sub,
        });
    }

    private getJwtExpiresIn(token: string): number {
        const result = jwt.verify(token, this.secret) as jwt.JwtPayload;
        return result.exp;
    }
}