import { Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto';

@Injectable()
export class AuthService {
  signup(createUserDto: CreateUserDto) {
    return createUserDto;
  }
  login(loginUserDto: LoginUserDto) {
    return loginUserDto;
  }
}
