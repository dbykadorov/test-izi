/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { InterfaceModule } from '@izi/core/interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );
  app.enableCors({ origin: true, credentials: true });

  const config = new DocumentBuilder()
    .setTitle('Tasks API')
    .setDescription('Simple tasks API (in-memory)')
    .setVersion('1.0.0')
    .addServer('/', 'Base path')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [AppModule, InterfaceModule],
    deepScanRoutes: true,
  });
  SwaggerModule.setup(`${globalPrefix}/docs`, app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
  Logger.log(`📘 Swagger is available at: http://localhost:${port}/${globalPrefix}/docs`);
}

bootstrap();
