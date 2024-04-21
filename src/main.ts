import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors();
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('CTSE Assignment 2')
    .setDescription('Base template for NestJS property listings core component')
    .setVersion('1.0.0')
    .build();

  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, config));

  await app.listen(5000);

  Logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch(reason => {
  Logger.warn('Failed to start the server');
  Logger.error(reason);
});
