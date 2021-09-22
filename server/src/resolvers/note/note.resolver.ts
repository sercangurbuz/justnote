import {
  Args,
  Info,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';
import { NoteService } from '../../services/note.service';
import { NotesArgs } from '../../models/args/notes.args';
import { NoteType } from '../../models/note.model';
import { CreateNoteInput } from './dto/createNote.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { UserEntity } from '../../decorators/user.decorator';
import { User } from '../../models/user.model';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
@UseGuards(GqlAuthGuard)
@Resolver(() => NoteType)
export class NoteResolver {
  constructor(private notesService: NoteService) {}

  @Subscription(() => NoteType)
  noteCreated() {
    return pubSub.asyncIterator('noteCreated');
  }

  @Query(() => NoteType)
  note(
    @Args('id', { type: () => Int }) id: number,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.notesService.getNoteById(id);
  }

  @Query(() => [NoteType])
  notes(
    @Args({ nullable: true }) noteArgs: NotesArgs,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.notesService.getNotes(noteArgs);
  }

  @Mutation(() => NoteType)
  createNote(@UserEntity() user: User, @Args('data') data: CreateNoteInput) {
    const newNote = this.notesService.createNote(data, user.id);
    pubSub.publish('noteCreated', { noteCreated: newNote });
    return newNote;
  }

  @ResolveField('user')
  user(@Parent() note: NoteType, @Info() info: GraphQLResolveInfo) {
    return this.notesService.getNoteById(note.id).user();
  }
}
