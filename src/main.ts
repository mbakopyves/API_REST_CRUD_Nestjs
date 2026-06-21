import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { AuthGuard } from 'commond/guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalPipes(new AuthGuard());
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`le serveur tourne sur localhost:${process.env.PORT ?? 3000}`);
  });
}
bootstrap();
