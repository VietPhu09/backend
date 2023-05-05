import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import path, { join } from 'path';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { PORT } from './contains';
import * as dotenv from 'dotenv';
const port = PORT || 9000;
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/image/' });
  app.use(
    session({
      secret: 'my-secret-key',
      resave: true,
      saveUninitialized: true,
    }),
  );
  app.listen(port, () => {
    console.log(`Server  is running on site http://localhost:${port}`);
  });
}

bootstrap();
