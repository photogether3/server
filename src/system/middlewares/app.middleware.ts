import {Injectable, Logger, NestMiddleware} from "@nestjs/common";
import {Request, Response} from "express";

@Injectable()
export class AppMiddleware implements NestMiddleware {

    private readonly logger = new Logger(AppMiddleware.name);

    use(req: Request, res: Response, next: (error?: any) => void) {
        this.logger.debug('==========Request Info==========');
        this.logger.debug('Client IP='+ `${req.headers['x-real-ip'] ?? req.ip}`);
        this.logger.debug('End-Point='+ req.originalUrl);
        this.logger.debug('Method='+ req.method);
        this.logger.debug('==========X Request Info X==========');
        next();
    }
}
