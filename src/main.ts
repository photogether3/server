import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { apiReference } from '@scalar/nestjs-api-reference';

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

    app.useGlobalPipes(new ValidationPipe({
        transform: true,
    }));

    const envService = app.get(EnvService);

    const config = new DocumentBuilder()
        .setTitle('Alexandria Lib')
        .setDescription('사진첩 덜어내기 API 문서')
        .addBearerAuth()
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    app.use(
        '/reference',
        apiReference({
            theme: 'elysiajs',
            spec: {
                url: 'http://localhost:4200',
                content: document,
            },
        }),
    );

    const { name, port } = envService.getAppEnv();
    await app.listen(port ?? 8000, () => Logger.log(`[${name}] Server started on port ${port}`));
}

bootstrap();
