import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() userDto: UserDto) {
    try {
      return this.authService.login(userDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('logout')
  async logout(@Body() userDto: UserDto) {
    try {
      return this.authService.logout(userDto);
    } catch (error) {
      throw new Error(error);
    }
  }
}
