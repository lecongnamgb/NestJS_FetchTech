import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class TodoItem {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String })
  deadline: string;
}

export type TodoItemDocument = TodoItem & Document;

export const TodoItemSchema = SchemaFactory.createForClass(TodoItem);
