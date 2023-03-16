import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from './commons/filter/http-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(7002, () => {
    console.log('=================');
    console.log('🐶🐶🐶 restAPI 백엔드 서버 오픈 🐶🐶🐶');
    console.log('=================');
  });
}
bootstrap();
