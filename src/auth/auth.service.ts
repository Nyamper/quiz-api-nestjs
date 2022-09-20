import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  public async login({ username, password }: UserDto) {
    try {
      const user = await this.findUserByName(username);

      if (!user) {
        throw new Error('User does not exist');
      }

      const isPasswordValid = await this.comparePassword(
        password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new Error('Password is invalid');
      }

      const token = await this.generateToken(user);
      user.token = token;
      await user.save();
      return token;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async logout({ token }: UserDto) {
    try {
      if (!token) {
        throw new Error('Token is not provided');
      }
      const { id } = await this.verifyToken(token);
      const user = await this.findUserById(id);
      if (!user) {
        throw new Error('User does not exist');
      }
      user.token = null;
      await user.save();
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findUserById(id: string) {
    try {
      return await this.userModel.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  private async findUserByName(username: string) {
    try {
      return await this.userModel.findOne({ username });
    } catch (error) {
      throw new Error(error);
    }
  }

  private async comparePassword(password: string, hashedPassword: string) {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      throw new Error(error);
    }
  }

  private async generateToken(user: User) {
    try {
      return await this.jwtService.sign({ id: user._id }, { expiresIn: '1h' });
    } catch (error) {
      throw new Error(error);
    }
  }

  public async verifyToken(token: string) {
    try {
      return await this.jwtService.verify(token);
    } catch (error) {
      throw new Error(error);
    }
  }
}
