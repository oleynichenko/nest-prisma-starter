import { Test } from '@nestjs/testing';
import type { Note } from '../../generated/prisma/client.js';
import { NoteController } from './note.controller.js';
import { NoteService } from './note.service.js';

describe('NoteController', () => {
  let controller: NoteController;

  const noteService = {
    create: vi.fn(),
    findAll: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [
        {
          provide: NoteService,
          useValue: noteService as unknown as NoteService,
        },
      ],
    }).compile();

    controller = module.get(NoteController);
  });

  it('creates a note', async () => {
    const created: Note = {
      id: 'note-id',
      title: 'Example note',
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
    };
    noteService.create.mockResolvedValue(created);

    await expect(controller.create({ title: 'Example note' })).resolves.toEqual(
      created,
    );
    expect(noteService.create).toHaveBeenCalledWith({ title: 'Example note' });
  });

  it('returns the notes from the service', async () => {
    noteService.findAll.mockResolvedValue([]);

    await expect(controller.findAll()).resolves.toEqual([]);
    expect(noteService.findAll).toHaveBeenCalledOnce();
  });
});
