import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}
  async findOne(username: string) {
    try {
      const user = await this.userModel.findOne({ username: username });
      return user;
    } catch (err) {
      console.log(`Whoops! ${err}`);
    }
  }
}
