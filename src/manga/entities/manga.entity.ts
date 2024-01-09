import { User } from 'src/auth/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mangas')
export class Manga {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('varchar')
  name: string;
  @Column('numeric', { default: 0 })
  chapter: number;
  @Column('numeric', { default: 0 })
  chapterPage: number;
  @Column('numeric', { nullable: true })
  nextChapter?: number;
  @Column('varchar')
  url: string;
  @Column('varchar', { nullable: true })
  comment?: string;
  @ManyToOne(() => User, (user) => user.mangas)
  user: User;
}
