import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service.js';
import type { Note } from '../../generated/prisma/client.js';
import type { CreateNoteDto } from './dto/create-note.dto.js';

@Injectable()
export class NoteService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateNoteDto): Promise<Note> {
    return this.prisma.note.create({
      data: {
        title: dto.title,
      },
    });
  }

  findAll(): Promise<Note[]> {
    return this.prisma.note.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
