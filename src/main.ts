import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import {  setupSwagger } from './common/utils/swagger';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.enableCors();
//   app.useGlobalPipes(new ValidationPipe({ transform: true }));


//   console.log("Sahas data", await convertTypeToOpenAPI())
//   setupSwagger(app)
//   await app.listen(3001);
// }
// bootstrap();




// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// if (import.meta.env.PROD) {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    setupSwagger(app)
    await app.listen(3001);
  }
  bootstrap();
// }

export const viteNodeApp = NestFactory.create(AppModule);