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
import { JwtService } from '@nestjs/jwt';

export interface JwtTokenResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async signup(createUserDto: CreateUserDto): Promise<JwtTokenResponse> {
    const { password, ...userData } = createUserDto;
    try {
      const encryptedPassword = this.encryptPassword(password);

      const user = this.userRepository.create({
        ...userData,
        password: encryptedPassword,
      });

      await this.userRepository.save(user);

      const { accessToken, refreshToken } = this.createJwtToken(user.id);

      return { accessToken, refreshToken };
    } catch (error) {
      this.handleDBError(error);
    }
  }
  async login(loginUserDto: LoginUserDto): Promise<JwtTokenResponse> {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      select: { id: true, email: true, password: true },
      where: { email },
    });

    if (!user) throw new UnauthorizedException('Invalid email or password');

    const isSamePassword = this.comparePlainPasswordAndEncryptedPassword(
      password,
      user.password,
    );

    if (!isSamePassword)
      throw new UnauthorizedException('Invalid email or password');

    const { accessToken, refreshToken } = this.createJwtToken(user.id);

    return { accessToken, refreshToken };
  }

  private handleDBError(error: any): void {
    if (error.errno === 1062)
      throw new ConflictException('User already exists');
  }

  private encryptPassword(password: string): string {
    return bcrypt.hashSync(
      password,
      +this.configService.getOrThrow('SALT_ROUNDS'),
    );
  }

  private comparePlainPasswordAndEncryptedPassword(
    plainTextPassword: string,
    encryptedPassword: string,
  ): boolean {
    return bcrypt.compareSync(plainTextPassword, encryptedPassword);
  }

  private createJwtToken(id: string) {
    const accessToken = this.jwtService.sign({ id });
    const refreshToken = this.jwtService.sign({ id }, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }
}
