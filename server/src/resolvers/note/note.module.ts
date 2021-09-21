import { Module } from '@nestjs/common';
import { NoteService } from '../../services/note.service';
import { NoteResolver } from './note.resolver';

@Module({
  providers: [NoteResolver, NoteService],
})
export class NoteModule {}
