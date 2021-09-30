import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class NotesArgs {
  note?: string;
}
