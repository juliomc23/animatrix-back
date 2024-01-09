import { Injectable } from '@nestjs/common';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Manga } from './entities/manga.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MangaService {
  constructor(
    @InjectRepository(Manga)
    private readonly mangaRepository: Repository<Manga>,
  ) {}

  async create(createMangaDto: CreateMangaDto) {
    return createMangaDto;
  }

  findAll() {
    return `This action returns all manga`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manga`;
  }

  update(id: number, updateMangaDto: UpdateMangaDto) {
    return { id, updateMangaDto };
  }

  remove(id: number) {
    return `This action removes a #${id} manga`;
  }
}
