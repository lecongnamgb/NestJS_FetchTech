import { AuthGuard } from './../../guards/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Note_item } from './../../schemas/note_item.schema';
import { CreateNoteItemDTO } from './dto/create-noteItem.dto';
import { NoteAppService } from './note_app.service';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('note-app')
export class NoteAppController {
  constructor(private readonly noteAppService: NoteAppService) {}

  @Get('items')
  @Roles('admin')
  @UseGuards(AuthGuard)
  async getAllItems(): Promise<Note_item[]> {
    return this.noteAppService.getAllItems();
  }

  @Get('items/:id')
  async getItem(
    @Param('id')
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
