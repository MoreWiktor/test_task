import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppFactory } from './app.factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const appFactory = new AppFactory(app);
  appFactory.useGlobalPipes().useGlobalFilters().generateOpenApiDoc().listen();
}

bootstrap();
