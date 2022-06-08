import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDTO } from './modules/users/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/signin')
  async signIn(@Body() createUserDTO: CreateUserDTO): Promise<any> {
    return this.appService.signIn(createUserDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Req() req: any): Promise<any> {
    console.log(req);
    return 'oke';
  }

  @Post('/auth/login')
  async logIn(@Body() createUserDTO: CreateUserDTO): Promise<any> {
    return this.appService.logIn(createUserDTO);
  }
}
