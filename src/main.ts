import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import accessTokenMiddleware from './middlewares/accessToken.middleware';
import { UserDto } from './user/dto/user.dto';

const { PORT } = process.env;

declare global {
  namespace Express {
    interface Request {
      context?: { user?: UserDto; token?: string };
    }
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(accessTokenMiddleware);
  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
