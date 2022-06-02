import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoItemDocument = Todo_item & Document;

@Schema()
export class Todo_item {
  @Prop({ required: true })
  title: string;

  @Prop()
  state: string;

  @Prop()
  deadline: Date;
}

export const Todo_itemSchema = SchemaFactory.createForClass(Todo_item);
