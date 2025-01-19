import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { MainModule } from './main.module';
import { EnvService } from './shared/env';

async function bootstrap() {
    const app = await NestFactory.create(MainModule);

    app.enableCors({
        origin: [
            'http://localhost:4200',  // 웹 개발 환경
            'capacitor://localhost',  // Capacitor
            'ionic://localhost',      // Ionic
            'file://*',               // 안드로이드 WebView
        ],
    });

    app.setGlobalPrefix('api');
    app.enableVersioning();

    const envService = app.get(EnvService);

    const config = new DocumentBuilder()
        .setTitle('Alexandria Lib API')
        .setDescription('Alexandria Lib API')
        .addBearerAuth()
        .setVersion('1.0')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    const { name, port } = envService.getAppEnv();
    await app.listen(port ?? 8000, () => Logger.log(`[${name}] Server started on port ${port}`));
}

bootstrap();
