import { Manga } from 'src/manga/entities/manga.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar')
  fullname: string;
  @Column('varchar', { unique: true })
  email: string;
  @Column('varchar')
  password: string;
  @OneToMany(() => Manga, (manga) => manga.user)
  mangas: Manga[];
}
