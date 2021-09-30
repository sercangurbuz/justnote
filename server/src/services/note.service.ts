import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { NotesArgs } from '../models/args/notes.args';
import { CreateNoteInput } from '../resolvers/note/dto/createNote.input';

@Injectable()
export class NoteService {
  constructor(private readonly prisma: PrismaService) {}

  getNoteById(id: number) {
    return this.prisma.note.findUnique({ where: { id } });
  }

  getNotes(noteArgs: NotesArgs) {
    if (Object.keys(noteArgs).length === 0) {
      return this.prisma.note.findMany({ orderBy: { id: 'desc' } });
    }

    return this.prisma.note.findMany({
      where: {
        note: { contains: noteArgs.note },
      },
      orderBy: { id: 'desc' },
    });
  }

  createNote(data: CreateNoteInput) {
    return this.prisma.note.create({
      data: {
        note: data.note,
      },
    });
  }
}
