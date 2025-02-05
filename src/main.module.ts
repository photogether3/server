import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { DatabaseModule } from './shared/database';
import { EnvModule } from './shared/env';
import { JwtModule } from './shared/jwt';
import { MailModule } from './shared/mail';
import { DiscordModule } from './shared/third-party';
import { FirebaseModule } from './shared/third-party/firebase';
import { AppMiddleware } from './system/middlewares';

import { ApisModule } from './apis.module';

@Module({
    imports: [
        EnvModule,
        DatabaseModule,
        JwtModule,
        MailModule,
        DiscordModule,
        FirebaseModule.forRoot(),
        ApisModule,
    ],
})
export class MainModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AppMiddleware)
            .forRoutes('*');
    }
}
