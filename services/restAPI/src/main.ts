import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from './commons/filter/http-exception.filter';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './commons/filter/All-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 스웨거 작성을 위해 추가 하였습니다.
  const config = new DocumentBuilder()
    .setTitle('💫💫💫eatsme restAPI💫💫💫')
    .setDescription('식당 등록,식당 조회 관련 API 입니다.')
    .setVersion('1.0')
    .addTag(
      ' info/road/get/restaurant를 GET방식으로 요청하면 추천 식당을 조회할 수 있습니다.',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: process.env.ORIGIN2,
    credentials: true,
  });
  await app.listen(7100, () => {
    console.log('=================');
    console.log('🐶🐶🐶 restAPI 백엔드 서버 오픈 🐶🐶🐶');
    console.log('=================');
  });
}
bootstrap();
