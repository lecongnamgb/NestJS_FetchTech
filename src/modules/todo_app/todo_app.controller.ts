import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { CreateTodoItemDTO } from './dto/create-todoItem.dto';
import { TodoAppService } from './todo_app.service';

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

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.User)
  @Post('/createItem')
  async createItem(
    @Body() createTodoItemDTO: CreateTodoItemDTO,
  ): Promise<string> {
    return this.todoAppService.createItem(createTodoItemDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Delete('/delete/:id')
  async deleteItem(@Param('id') id: string): Promise<string> {
    return this.todoAppService.deleteItem(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Patch('/update/:id')
  async updateItem(
    @Body() createTodoItemDTO: CreateTodoItemDTO,
    @Param('id') id: string,
  ): Promise<string> {
    return this.todoAppService.updateItem(createTodoItemDTO, id);
  }
}
