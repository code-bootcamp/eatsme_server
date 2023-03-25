import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload';
import { HttpExceptionFilter } from 'src/commons/filter/http-exception.filter';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(graphqlUploadExpress());

  app.enableCors({
    origin: process.env.ORIGIN,
    credentials: true,
  });
  app.use(helmet.referrerPolicy({ policy: 'strict-origin-when-cross-origin' }));

  await app.listen(7000, () => {
    console.log('=================');
    console.log('🐶🐶🐶 graphql 백엔드 서버 오픈 🐶🐶🐶');
    console.log('=================');
  });
}
bootstrap();
