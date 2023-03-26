import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from './commons/filter/http-exception.filter';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './commons/filter/All-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: process.env.ORIGIN,
    credentials: true,
  });
  await app.listen(7100, () => {
    console.log('=================');
    console.log('🐶🐶🐶 restAPI 백엔드 서버 오픈 🐶🐶🐶');
    console.log('=================');
  });
}
bootstrap();
