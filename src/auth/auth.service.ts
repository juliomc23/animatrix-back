import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}
  async signup(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;
    try {
      const encryptedPassword = this.encryptPassword(password);

      const user = this.userRepository.create({
        ...userData,
        password: encryptedPassword,
      });

      await this.userRepository.save(user);

      return user;
    } catch (error) {
      this.handleDBError(error);
    }
  }
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      select: { email: true, password: true },
      where: { email },
    });

    if (!user) throw new UnauthorizedException('Invalid email or password');

    const isSamePassword = this.comparePlainPasswordAndEncryptedPassword(
      password,
      user.password,
    );

    if (!isSamePassword)
      throw new UnauthorizedException('Invalid email or password');

    return user;
  }

  private handleDBError(error: any) {
    if (error.errno === 1062)
      throw new ConflictException('User already exists');
  }

  private encryptPassword(password: string) {
    return bcrypt.hashSync(
      password,
      +this.configService.getOrThrow('SALT_ROUNDS'),
    );
  }

  private comparePlainPasswordAndEncryptedPassword(
    plainTextPassword: string,
    encryptedPassword: string,
  ) {
    return bcrypt.compareSync(plainTextPassword, encryptedPassword);
  }
}
