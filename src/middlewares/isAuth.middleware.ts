import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';
import jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

interface UserIDJwtPayload extends jwt.JwtPayload {
  id: string;
}

@Injectable()
export class IsAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.context?.token) {
      throw new UnauthorizedException('token is not provided');
    }

    try {
      const decodedToken = this.jwtService.verify(
        req.context.token,
      ) as UserIDJwtPayload;

      console.log('decodedToken.id', decodedToken.id);
      const user = await this.authService.findUserById(decodedToken.id);
      console.log(user);

      if (!user) {
        throw new UnauthorizedException();
      }

      if (user.token !== req.context.token) {
        throw new UnauthorizedException();
      }

      req.context = {
        ...req.context,
        user,
      };

      next();
    } catch (error) {
      throw new UnauthorizedException('Failed to authenticate token');
    }
  }
}
