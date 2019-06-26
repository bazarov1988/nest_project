import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from './../config';
import { User } from '../user/entities';
import { UsersService } from '../user/services';
import { LoginPayload } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) { }

  async createToken(user: User) {
    return {
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      accessToken: this.jwtService.sign(Object.assign({}, user)),
    };
  }

  async signIn(payload: LoginPayload): Promise<any> {
    const user = await this.userService.getByEmailAndPass(payload.email, payload.password);
    if (!user) {
      throw new UnauthorizedException('Wrong login combination!');
    }
    return user;
  }

  async validateUser(payload): Promise<any> {
    return await this.userService.getByEmail(payload.email);
  }
}
