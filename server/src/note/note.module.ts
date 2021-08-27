import { Module } from '@nestjs/common';
import { NoteResolver } from './note.resolver';
import { NoteService } from './note.service';

@Module({
  providers: [NoteResolver, NoteService],
  exports: [NoteService],
})
export class NoteModule {}
