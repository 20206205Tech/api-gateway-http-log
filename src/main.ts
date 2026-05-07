import { ConsoleLogger, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SWAGGER_AUTH_KEY } from './constants/swagger.constant';

async function bootstrap() {
  const ENVIRONMENT = process.env.ENVIRONMENT ?? 'production';
  const PORT = process.env.PORT ?? 30009;
  const SERVICE_NAME = 'api-gateway-http-log';

  // const SUPABASE_PROJECT_ID = process.env.SUPABASE_PROJECT_ID;

  let DESCRIPTION = '';
  DESCRIPTION += `# Chào mừng đến với ${SERVICE_NAME} (${ENVIRONMENT})\n`;
  // DESCRIPTION += `* [Google](https://${SUPABASE_PROJECT_ID}.supabase.co/auth/v1/authorize?provider=google)\n`;
  DESCRIPTION += `* [Local](http://localhost:${PORT})\n`;
  DESCRIPTION = DESCRIPTION.trim();

  Logger.debug(`DESCRIPTION: \n${DESCRIPTION}`);

  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: SERVICE_NAME,
    }),
  });

  // app.setGlobalPrefix('api', {
  //   exclude: ['/'],
  // });

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true, // Loại bỏ các trường không được định nghĩa trong DTO
  //     transform: true, // Tự động convert kiểu dữ liệu (vd: string sang number)
  //   }),
  // );

  const configSwagger = new DocumentBuilder()
    .setTitle(`${SERVICE_NAME} (${ENVIRONMENT})`)
    .setDescription(DESCRIPTION)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      SWAGGER_AUTH_KEY,
    )
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, configSwagger);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  SwaggerModule.setup('docs', app, documentFactory, customOptions);

  await app.listen(PORT);
}

bootstrap().catch((err) => {
  console.error('Lỗi khi khởi động ứng dụng:', err);
});
