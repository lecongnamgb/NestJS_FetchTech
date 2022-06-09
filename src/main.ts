import { RolesGuard } from './modules/auth/roles.guard';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new RolesGuard(new Reflector()));
  await app.listen(PORT);
}
bootstrap();
