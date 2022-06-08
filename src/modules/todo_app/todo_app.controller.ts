import { CreateTodoItemDTO } from './dto/create-todoItem.dto';
import { TodoItem } from './../../schemas/todoItem.schema';
import { TodoAppService } from './todo_app.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('todo-app')
export class TodoAppController {
  constructor(private readonly todoAppService: TodoAppService) {}

  @Get('/items')
  async getAllItems(): Promise<any> {
    return this.todoAppService.getAllItems();
  }

  @Get('/items/:id')
  async getItem(@Param('id') id: any): Promise<any> {
    return this.todoAppService.getItem(id);
  }

  @Post('/createItem')
  async createItem(
    @Body() createTodoItemDTO: CreateTodoItemDTO,
  ): Promise<string> {
    return this.todoAppService.createItem(createTodoItemDTO);
  }

  @Delete('/delete/:id')
  async deleteItem(@Param('id') id: string): Promise<string> {
    return this.todoAppService.deleteItem(id);
  }

  @Patch('/update/:id')
  async updateItem(
    @Body() createTodoItemDTO: CreateTodoItemDTO,
    @Param('id') id: string,
  ): Promise<string> {
    return this.todoAppService.updateItem(createTodoItemDTO, id);
  }
}
