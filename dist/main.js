"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads'), {
        prefix: '/uploads/',
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('SMS API')
        .setDescription('The sales management system API description')
        .setVersion('1.0')
        .addTag('sms')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
    }, 'access-token')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.enableCors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Accept',
            'X-Requested-With',
            'Content-Length',
            'X-Session-ID',
            'x-session-id'
        ],
        exposedHeaders: ['Content-Disposition'],
    });
    await app.listen(process.env.PORT ?? 3000);
    console.log(`🚀 Application is running on: ${await app.getUrl()}`);
    console.log(`📚 Swagger documentation: ${await app.getUrl()}/api`);
    console.log(`🖼️ Static files serving from: ${(0, path_1.join)(__dirname, '..', 'uploads')}`);
}
bootstrap();
//# sourceMappingURL=main.js.map