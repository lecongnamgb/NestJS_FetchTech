import { IsString, IsInt } from 'class-validator';
export class CreateNoteItemDTO {
  @IsString()
  title: string;

  @IsInt()
  body: number;
}
