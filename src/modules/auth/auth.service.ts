import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    console.log('validate user in auth service');
    try {
      const user = await this.usersService.findOne(username);
      if (user && user.password === password) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (err) {
      console.log(`Whoops! ${err}`);
    }
  }

  async login(user: any) {
    const payload = { username: user.username };
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
