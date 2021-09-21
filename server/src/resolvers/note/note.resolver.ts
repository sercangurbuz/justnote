import { Args, Info, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';
import { NoteService } from '../../services/note.service';
import { NotesArgs } from '../../models/args/notes.args';
import { NoteType } from '../../models/note.model';
import { CreateNoteInput } from './dto/createNote.input';

@Resolver(NoteType)
export class NoteResolver {
  constructor(private notesService: NoteService) {}

  @Query(() => NoteType, { nullable: true })
  note(@Args('id', { type: () => Int }) id: number) {
    debugger;
    return this.notesService.getNoteById(id);
  }

  @Query(() => [NoteType])
  notes(@Args() noteArgs: NotesArgs, @Info() info: GraphQLResolveInfo) {
    return this.notesService.getNotes(noteArgs, new PrismaSelect(info).value);
  }

  @Mutation(() => NoteType)
  createNote(@Args('data') data: CreateNoteInput) {
    return this.notesService.createNote(data);
  }
}
