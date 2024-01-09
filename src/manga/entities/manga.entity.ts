import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mangas')
export class Manga {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('varchar')
  name: string;
  @Column('numeric')
  chapter: number;
  @Column('numeric')
  chapterPage: number;
  @Column('numeric')
  nextChapter: number;
  @Column('varchar')
  url: string;
  @Column('varchar', { nullable: true })
  comment?: string;
}
