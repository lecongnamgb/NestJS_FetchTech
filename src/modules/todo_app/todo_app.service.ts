import { CreateTodoItemDTO } from './dto/create-todoItem.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { TodoItemDocument } from 'src/schemas/todoItem.schema';

@Injectable()
export class TodoAppService {
  constructor(
    @InjectModel('TodoItem') private todoModel: Model<TodoItemDocument>,
  ) {}

  async getAllItems(): Promise<any> {
    return await this.todoModel.find();
  }

  async getItem(id: string): Promise<any> {
    try {
      const item = await this.todoModel.findOne({ _id: id });
      console.log(item);
      if (!item) {
        return 'Invalid id';
      }
      return item;
    } catch (err) {
      return `Whoops! ${err}`;
    }
  }

  async createItem(CreateTodoItemDTO: CreateTodoItemDTO): Promise<string> {
    try {
      const item = await this.todoModel.create(CreateTodoItemDTO);
      if (!item) {
        return `There are some problems when creating item`;
      }
      return `Create item successfully`;
    } catch (err) {
      return `Whoops! ${err}`;
    }
  }

  async updateItem(
    CreateTodoItemDTO: CreateTodoItemDTO,
    id: string,
  ): Promise<string> {
    try {
      const item = await this.todoModel.findOne({ _id: id });
      if (!item) {
        return `Invalid id`;
      }
      const updatedItem = await this.todoModel.findOneAndUpdate(
        { _id: id },
        CreateTodoItemDTO,
      );
      if (!updatedItem) {
        return `There are some problems when updating item`;
      }
      return `Update item successfully`;
    } catch (err) {
      return `Whoops! ${err}`;
    }
  }

  async deleteItem(id: string) {
    try {
      const item = await this.todoModel.findOne({ _id: id });
      if (!item) {
        return `Invalid Id`;
      }
      const deletedItem = await this.todoModel.findOneAndDelete({ _id: id });
      if (!deletedItem) {
        return `There are some problems when deleting item`;
      }
      return `Delete item successfully`;
    } catch (err) {
      return `Whoops! ${err}`;
    }
  }
}
