import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { QuizModule } from './quiz/quiz.module';
import { JwtModule } from '@nestjs/jwt';
import { IsAuthMiddleware } from './middlewares/isAuth.middleware';

const { MONGO_URI } = process.env;

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URI),
    AuthModule,
    QuizModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsAuthMiddleware).forRoutes('quiz');
  }
}
