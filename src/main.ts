import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const port = process.env.PORT ?? 3000;
	const options = new DocumentBuilder()
		.setTitle('정현승의 팬마음 구현 과제')
		.setDescription('정현승의 팬마음 구현 과제로 구현된 것입니다.')
		.setVersion('0.0.1')
		.addServer('http://localhost:' + port + '/', 'Local environment')
		.addTag('API 목록')
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('swagger.html', app, document);
	await app.listen(port);
}
bootstrap();
