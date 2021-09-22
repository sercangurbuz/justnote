import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { NoteStatus } from '.prisma/client';

@InputType()
export class CreateNoteInput {
  @Field()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsNotEmpty()
  title: string;
}
