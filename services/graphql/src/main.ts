import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/commons/filter/http-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(7000, () => {
    console.log('=================');
    console.log('🐶🐶🐶 graphql 백엔드 서버 오픈 🐶🐶🐶');
    console.log('=================');
  });
}
bootstrap();
