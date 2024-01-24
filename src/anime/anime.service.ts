import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Anime } from './entities/anime.entity';

@Injectable()
export class AnimeService {
  constructor(
    @InjectRepository(Anime)
    private readonly animeRespository: Repository<Anime>,
  ) {}
  async create(createAnimeDto: CreateAnimeDto, user: User) {
    try {
      const anime = this.animeRespository.create({
        ...createAnimeDto,
        user,
      });

      await this.animeRespository.save(anime);
      return anime;
    } catch (error) {
      console.log(error);
    }
  }

  async findAllAnimesByUserId(id: string) {
    return await this.animeRespository.find({ where: { user: { id } } });
  }

  async findOne(id: number) {
    const anime = await this.animeRespository.findOneBy({ id });

    if (!anime) {
      throw new NotFoundException('Anime not found');
    }
    return anime;
  }

  async update(id: number, updateAnimeDto: UpdateAnimeDto) {
    const updatedAnime = await this.animeRespository.preload({
      id,
      ...updateAnimeDto,
    });
    return await this.animeRespository.save(updatedAnime);
  }

  async remove(id: number) {
    const anime = await this.findOne(id);
    return await this.animeRespository.remove(anime);
  }
}
