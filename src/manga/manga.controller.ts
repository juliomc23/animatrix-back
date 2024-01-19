import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUserData } from 'src/auth/decorators/get-user.decorator';
import { CreateMangaDto } from './dto/create-manga.dto';
import { UpdateMangaDto } from './dto/update-manga.dto';
import { MangaService } from './manga.service';
import { User } from 'src/auth/entities/user.entity';

@Controller('manga')
export class MangaController {
  constructor(private readonly mangaService: MangaService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createMangaDto: CreateMangaDto, @GetUserData() user: User) {
    return this.mangaService.create(createMangaDto, user);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(@GetUserData('id') id: string) {
    return this.mangaService.findAllMangasByUserId(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mangaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMangaDto: UpdateMangaDto) {
    return this.mangaService.update(+id, updateMangaDto);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mangaService.remove(+id);
  }
}
