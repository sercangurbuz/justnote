import { NoteStatus } from '.prisma/client';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class NotesArgs {
  @Field({ nullable: true })
  title?: string;
  @Field({ nullable: true })
  description?: string;
  @Field({ nullable: true })
  status?: NoteStatus;
}
