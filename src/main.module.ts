import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { EnvModule } from './shared/env';
import { JwtModule } from './shared/jwt';
import { MailModule } from './shared/mail';
import { DatabaseModule } from './shared/database';
import { DiscordModule } from './shared/third-party';

import { AppMiddleware } from './system/middlewares';
import { AppExceptionFilter } from './system/exceptions';

import { RouterModule } from './router.module';

@Module({
    imports: [
        EnvModule,
        DatabaseModule,
        JwtModule,
        MailModule,
        DiscordModule,
        RouterModule,
    ],
    providers: [
        { provide: APP_FILTER, useClass: AppExceptionFilter },
    ],
})
export class MainModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AppMiddleware)
            .forRoutes('*');
    }
}
