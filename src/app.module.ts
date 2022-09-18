import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { QuizModule } from './quiz/quiz.module';
import { IsAuthMiddleware } from './middlewares/isAuth.middleware';

const { MONGO_URI } = process.env;

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URI),
    AuthModule,
    QuizModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsAuthMiddleware).forRoutes('quiz');
  }
}
