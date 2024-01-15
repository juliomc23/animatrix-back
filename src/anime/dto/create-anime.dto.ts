import {
  IsString,
  MinLength,
  IsNumber,
  IsPositive,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateAnimeDto {
  @IsString()
  @MinLength(5)
  name: string;
  @IsNumber()
  @IsPositive()
  episode: number;
  @IsNumber()
  @IsPositive()
  episodeMinute: number;
  @IsNumber()
  @IsPositive()
  @IsOptional()
  nextEpisode?: number;
  @IsUrl()
  url: string;
  @IsOptional()
  @IsString()
  comment?: string;
}
