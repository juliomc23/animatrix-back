import { Injectable } from '@nestjs/common';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Manga } from './entities/manga.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class MangaService {
  constructor(
    @InjectRepository(Manga)
    private readonly mangaRepository: Repository<Manga>,
  ) {}

  async create(createMangaDto: CreateMangaDto, user: User) {
    console.log(createMangaDto);
    try {
      const manga = this.mangaRepository.create({
        ...createMangaDto,
        user,
      });
      await this.mangaRepository.save(manga);
      return manga;
    } catch (error) {
      console.log(error);
    }

    return createMangaDto;
  }

  findAll() {
    return this.mangaRepository.find();
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
