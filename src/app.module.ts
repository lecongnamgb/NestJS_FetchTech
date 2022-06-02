import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteAppModule } from './modules/note_app/note_app.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL),
    NoteAppModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
