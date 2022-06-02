import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './../../middlewares/logger.middleware';
import { Note_itemSchema } from './../../schemas/note_item.schema';
import { NoteAppController } from './note_app.controller';
import { NoteAppService } from './note_app.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Note_item', schema: Note_itemSchema }]),
  ],
  controllers: [NoteAppController],
  providers: [NoteAppService],
})
export class NoteAppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(NoteAppController);
  }
}
