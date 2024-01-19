import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AnimeService } from './anime.service';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUserData } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @UseGuards(AuthGuard())
  @Post()
  create(@Body() createAnimeDto: CreateAnimeDto, @GetUserData() user: User) {
    return this.animeService.create(createAnimeDto, user);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(@GetUserData('id') id: string) {
    return this.animeService.findAllAnimesByUserId(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimeDto: UpdateAnimeDto) {
    return this.animeService.update(+id, updateAnimeDto);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animeService.remove(+id);
  }
}
