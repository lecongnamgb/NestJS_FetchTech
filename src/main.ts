import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.ACCESS_TOKEN_LIFE);
  await app.listen(process.env.PORT);
}
bootstrap();
