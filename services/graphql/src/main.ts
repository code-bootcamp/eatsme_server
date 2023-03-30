import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/commons/filter/http-exception.filter';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './commons/filter/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    // origin: process.env.ORIGIN,
    origin: '*',
    credentials: true,
  });
  await app.listen(7000, () => {
    console.log('=================');
    console.log('🐶🐶🐶 graphql 백엔드 서버 오픈 🐶🐶🐶');
    console.log('=================');
  });
}
bootstrap();
