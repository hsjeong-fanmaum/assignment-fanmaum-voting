import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import expressBasicAuth from 'express-basic-auth';

//은행님의 코드와 인터넷을 참고했습니다. 다만 코드를 보니 해결을 어떻게 진행하는지는 이해가 바로 되었습니다.
BigInt.prototype['toJSON'] = function () {
  return (<bigint>this).toString();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  if (process.env.NODE_ENV !== 'prod') {
    const swaggerUser = process.env.SWAGGER_USER!;
    const swaggerPassword = process.env.SWAGGER_PASSWORD!;
    app.use(
      ['/swagger.html'], // '/' 없으면 작동하지 않음, 안 붙였다 30분 날렸습니다
      expressBasicAuth({
        //찾아본 결과 tsconfig.json에 "esModuleInterop": true 붙이라는데 안 붙여도 돌아가더라고요.
        //현재 안 붙인 상태이니 만약 에러난다면 시도해야할 행위 1순위가 될 것 같습니다.
        challenge: true,
        users: {
          [swaggerUser]: swaggerPassword,
        },
      }),
    );
    const config = new DocumentBuilder()
      .setTitle('팬마음 구현 과제')
      .setDescription('정현승의 팬마음 구현 NestJS 과제입니다.')
      .setVersion('0.0.1')
      .addGlobalResponse({
        status: 500,
        description: 'Internal server error',
      })
      .addBearerAuth()
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    //기존(입사 전 개인 프로젝트)에 사용하던 uri와 일치하도록 설정 변경했는데 괜찮을까요?
    SwaggerModule.setup('swagger.html', app, documentFactory);
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
