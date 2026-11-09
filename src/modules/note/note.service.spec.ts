import { Test } from '@nestjs/testing';
import { PrismaService } from '../../database/prisma/prisma.service.js';
import type { Note } from '../../generated/prisma/client.js';
import { NoteService } from './note.service.js';

describe('NoteService', () => {
  let service: NoteService;

  const prisma = {
    note: {
      create: vi.fn(),
      findMany: vi.fn(),
    },
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module = await Test.createTestingModule({
      providers: [
        NoteService,
        {
          provide: PrismaService,
          useValue: prisma as unknown as PrismaService,
        },
      ],
    }).compile();

    service = module.get(NoteService);
  });

  it('creates a note', async () => {
    const created: Note = {
      id: 'note-id',
      title: 'Example note',
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
    };
    prisma.note.create.mockResolvedValue(created);

    await expect(service.create({ title: 'Example note' })).resolves.toEqual(
      created,
    );
    expect(prisma.note.create).toHaveBeenCalledWith({
      data: { title: 'Example note' },
    });
  });

  it('returns notes newest first', async () => {
    const notes: Note[] = [];
    prisma.note.findMany.mockResolvedValue(notes);

    await expect(service.findAll()).resolves.toEqual(notes);
    expect(prisma.note.findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: 'desc' },
    });
  });
});
