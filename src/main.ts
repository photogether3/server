import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

import { EnvService } from './shared/env';
import { validationExceptionFactory } from './shared/validations';

import { MainModule } from './main.module';

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
        whitelist: true,
        exceptionFactory: (errors) => validationExceptionFactory(errors),
    }));

    const envService = app.get(EnvService);

    const config = new DocumentBuilder()
        .setTitle('Photogether 🎨')
        .setDescription('API 문서')
        .addBearerAuth()
        .setVersion('0.8.7')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    app.use(
        '/reference',
        apiReference({
            theme: 'elysiajs',
            spec: {
                content: document,
            },
        }),
    );

    const { name, port } = envService.getAppEnv();
    await app.listen(port ?? 8000, () => Logger.log(`[${name}] Server started on port ${port}`));
}

bootstrap();
