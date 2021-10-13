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
import { GraphQLResolveInfo } from 'graphql';
import { NoteService } from '../../services/note.service';
import { NotesArgs } from '../../models/args/notes.args';
import { NoteType } from '../../models/note.model';
import { CreateNoteInput } from './dto/createNote.input';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { UserEntity } from 'src/decorators/user.decorator';
import { User } from '.prisma/client';

const pubSub = new PubSub();
@Resolver(() => NoteType)
@UseGuards(GqlAuthGuard)
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
    @UserEntity() user: User,
    @Info() info: GraphQLResolveInfo,
  ) {
    console.log('noteArgs', noteArgs);

    return this.notesService.getNotes(noteArgs, user.id);
  }

  @Mutation(() => NoteType)
  createNote(@Args('data') data: CreateNoteInput, @UserEntity() user: User) {
    console.log('user', user);

    const newNote = this.notesService.createNote(data, user.id);
    pubSub.publish('noteCreated', { noteCreated: newNote });
    return newNote;
  }
}
