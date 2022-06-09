import { RolesGuard } from './modules/auth/roles.guard';
import { TodoAppModule } from './modules/todo_app/todo_app.module';
import { UserSchema } from './schemas/user.schema';
import { UsersModule } from './modules/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    UsersModule,
    JwtModule.register({
      secret: '123',
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    TodoAppModule,
  ],
  controllers: [AppController],
  providers: [AppService, RolesGuard],
  exports: [AppService],
})
export class AppModule {}
