import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateMangaDto {
  @IsString()
  @MinLength(5)
  name: string;
  @IsNumber()
  @IsPositive()
  chapter: number;
  @IsNumber()
  @IsPositive()
  chapterPage: number;
  @IsNumber()
  @IsPositive()
  @IsOptional()
  nextChapter?: number;
  @IsUrl()
  url: string;
  @IsOptional()
  @IsString()
  comment?: string;
}
