import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TodoAppController } from './todo_app.controller';
import { TodoAppService } from './todo_app.service';
import { TodoItemSchema } from 'src/schemas/todoItem.schema';

@Module({
  controllers: [TodoAppController],
  providers: [TodoAppService],
  imports: [
    MongooseModule.forFeature([{ name: 'TodoItem', schema: TodoItemSchema }]),
  ],
})
export class TodoAppModule {}
