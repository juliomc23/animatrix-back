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

  async findAllMangasByUserId(id: string) {
    return await this.mangaRepository.find({ where: { user: { id } } });
  }

  findOne(id: number) {
    return `This action returns a #${id} manga`;
  }

  update(id: number, updateMangaDto: UpdateMangaDto) {
    return { id, updateMangaDto };
  }

  async remove(id: number) {
    const manga = await this.mangaRepository.findOneBy({ id });
    return await this.mangaRepository.remove(manga);
  }
}
