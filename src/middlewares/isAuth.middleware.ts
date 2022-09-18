import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';
import jwt from 'jsonwebtoken';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    userId: string;
  }
}

@Injectable()
export class IsAuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.context?.token) {
      throw new UnauthorizedException('token is not provided');
    }
    try {
      const decodedToken = jwt.verify(
        req.context.token,
        process.env.JWT_SECRET,
      ) as jwt.UserIDJwtPayload;

      const user = await this.authService.findUserById(decodedToken.userId);

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

// async function isAuthMiddleware(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   if (!req.context?.token) {
//     return res.status(401).send({ auth: false, message: 'No token provided.' });
//   }

//   try {
//     const service = new AuthService();
//     const decodedToken = <jwt.UserIDJwtPayload>(
//       service.verifyToken(req.context.token)
//     );
//     const user = await service.findUserById(decodedToken.id);
//     if (!user) {
//       return res.status(401).send({ auth: false, message: 'User not found.' });
//     }
//     if (user.token !== req.context.token) {
//       return res.status(401).send({ auth: false, message: 'Invalid token.' });
//     }
//     req.context = {
//       ...req.context,
//       user,
//     };
//     next();
//   } catch (error) {
//     return res
//       .status(401)
//       .send({ auth: false, message: 'Failed to authenticate token.' });
//   }
// }

// export default isAuthMiddleware;
