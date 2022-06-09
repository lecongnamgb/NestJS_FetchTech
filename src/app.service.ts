import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDTO } from './modules/users/dto/create-user.dto';
import { UserDocument } from './schemas/user.schema';

const saltOrRounds = 10;

@Injectable()
export class AppService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async signIn(createUserDTO: CreateUserDTO): Promise<any> {
    try {
      const user = await this.userModel.findOne({
        username: createUserDTO.username,
      });
      if (user) {
        return 'Username has already existed! Please try another username';
      }
      const hashpw = await bcrypt.hash(createUserDTO.password, saltOrRounds);
      console.log(hashpw);
      const createdUser = await this.userModel.create({
        username: createUserDTO.username,
        password: hashpw,
      });
      if (!createdUser) {
        return `There are some problems when creating user!`;
      }
      return `Create User successfully`;
    } catch (err) {
      console.log(`Whoop! ${err}`);
    }
  }

  async logIn(createUserDTO: CreateUserDTO): Promise<any> {
    try {
      const user = await this.userModel.findOne({
        username: createUserDTO.username,
      });
      if (!user) {
        return 'Username is incorrect';
      }
      const isValidPassword = await bcrypt.compare(
        createUserDTO.password,
        user.password,
      );

      if (!isValidPassword) {
        return 'Password is incorrect';
      }
      const payload = { username: user.username, role: user.role };
      return {
        message: 'LogIn successfully',
        accessToken: this.jwtService.sign(payload),
      };
    } catch (err) {
      console.log(`Whoop! ${err}`);
    }
  }
}
