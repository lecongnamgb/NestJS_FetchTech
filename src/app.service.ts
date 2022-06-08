import { CreateUserDTO } from './modules/users/dto/create-user.dto';
import { UserSchema, UserDocument } from './schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class AppService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}
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
}
