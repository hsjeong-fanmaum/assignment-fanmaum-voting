import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

//은행님의 코드와 인터넷을 참고했습니다. 다만 코드를 보니 해결을 어떻게 진행하는지는 이해가 바로 되었습니다.
BigInt.prototype['toJSON'] = function () {
  return (<bigint>this).toString();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('팬마음 구현 과제')
    .setDescription('정현승의 팬마음 구현 NestJS 과제입니다.')
    .setVersion('0.0.1')
    .addGlobalResponse({
      status: 500,
      description: 'Internal server error',
    })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  //기존(입사 전 개인 프로젝트)에 사용하던 uri와 일치하도록 설정 변경했는데 괜찮을까요?
  SwaggerModule.setup('swagger.html', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
