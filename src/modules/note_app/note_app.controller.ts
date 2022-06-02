import { ValidationPipe } from './../../pipes/validation.pip';
import { CreateNoteItemDTO } from './dto/create-noteItem.dto';
import { Note_item } from './../../schemas/note_item.schema';
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  ParseIntPipe,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { NoteAppService } from './note_app.service';

@Controller('note-app')
export class NoteAppController {
  constructor(private readonly noteAppService: NoteAppService) {}

  @Get('items')
  async getAllItems(): Promise<Note_item[]> {
    return this.noteAppService.getAllItems();
  }

  @Get('items/:id')
  async getItem(
    @Param('id', ValidationPipe)
    id: number,
  ): Promise<Note_item> {
    return this.noteAppService.getItem(id);
  }

  @Post('/create')
  async createItem(
    @Body() createNoteItemDTO: CreateNoteItemDTO,
  ): Promise<string> {
    return this.noteAppService.createItem(createNoteItemDTO);
  }

  @Put('/update/:id')
  async updateItem(
    @Param() params,
    @Body() createNoteItemDTO: CreateNoteItemDTO,
  ): Promise<string> {
    return this.noteAppService.updateItem(params.id, createNoteItemDTO);
  }

  @Delete('delete/:id')
  async deleteItem(@Param() params): Promise<string> {
    return this.noteAppService.deleteItem(params.id);
  }
}
