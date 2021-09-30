import { IsNotEmpty, MinLength } from 'class-validator';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateNoteInput {
  @IsNotEmpty()
  @MinLength(5)
  note: string;
}
