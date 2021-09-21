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

  getNotes(noteArgs: NotesArgs, select: any) {
    return this.prisma.note.findMany({
      where: {
        OR: [
          {
            title: { contains: noteArgs.title },
          },
          {
            description: { contains: noteArgs.description },
          },
          {
            status: noteArgs.status,
          },
        ],
      },
      ...select,
    });
  }

  createNote(data: CreateNoteInput) {
    return this.prisma.note.create({
      data,
    });
  }
}
