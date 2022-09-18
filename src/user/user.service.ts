import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  public async createUser({ username, password }: UserDto) {
    try {
      const existingUser = await this.findUserByName(username);
      if (existingUser) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      const hashedPassword = await this.hashPassword(password);
      const user = new this.userModel({
        username,
        password: hashedPassword,
      });
      return await user.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  private async findUserByName(username: string) {
    try {
      console.log('username', username);
      return await this.userModel.findOne({ username });
    } catch (error) {
      throw new Error(error);
    }
  }

  private async hashPassword(password: string) {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      throw new Error(error);
    }
  }
}
