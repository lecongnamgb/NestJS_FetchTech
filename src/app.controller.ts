import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import jwt from 'jsonwebtoken';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/login')
  login(@Req() req) {
    const data = req.body;
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '30s',
    });
    console.log(token);
  }
}
