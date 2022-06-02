import { CreateNoteItemDTO } from './dto/create-noteItem.dto';
import { NoteItemDocument, Note_item } from './../../schemas/note_item.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NoteAppService {
  constructor(
    @InjectModel('Note_item') private noteModel: Model<NoteItemDocument>,
  ) {}

  async getAllItems(): Promise<Note_item[]> {
    try {
      const data = await this.noteModel.find();
      return data;
    } catch {
      console.log('Whoops! There are some issues when getting all data');
    }
  }

  async getItem(id: number): Promise<Note_item> {
    try {
      const data = await this.noteModel.findOne({ _id: id });
      return data;
    } catch (err) {
      console.log(`Whoops! Error: ${err}`);
    }
  }

  async updateItem(
    id: string,
    createNoteItemDTO: CreateNoteItemDTO,
  ): Promise<string> {
    try {
      await this.noteModel.findOneAndUpdate({ _id: id }, createNoteItemDTO);
      return `Update item successfully`;
    } catch (err) {
      return `Whoops! Error: ${err}`;
    }
  }

  async createItem(createNoteItemDTO: CreateNoteItemDTO): Promise<string> {
    try {
      const createdItem = new this.noteModel(createNoteItemDTO);
      await createdItem.save();
      return `Create item successfully`;
    } catch (err) {
      return `Whoops! Error: ${err}`;
    }
  }

  async deleteItem(id: string): Promise<string> {
    try {
      await this.noteModel.deleteOne({ _id: id });
      return `Delete item successfully`;
    } catch (err) {
      return `Whoops! Error: ${err}`;
    }
  }
}
