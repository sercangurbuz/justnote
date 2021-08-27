import { Query, Resolver } from '@nestjs/graphql';
import { NoteService } from './note.service';
import { NoteType } from './notes.type';

@Resolver(() => NoteType)
export class NoteResolver {
  constructor(private notesService: NoteService) {}

  @Query(() => NoteType)
  note() {
    return this.notesService.findOne(1);
  }
}
