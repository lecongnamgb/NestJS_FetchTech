import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Note_item {
  @Prop({ required: true })
  title: string;

  @Prop()
  body: string;
}

export type NoteItemDocument = Note_item & Document;

export const Note_itemSchema = SchemaFactory.createForClass(Note_item);
