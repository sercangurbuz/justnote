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
    });
  }

  createNote(data: CreateNoteInput, userId: number) {
    return this.prisma.note.create({
      data: {
        description: data.description,
        title: data.title,
        userId: userId,
        status: 'PENDING',
      },
    });
  }
}
