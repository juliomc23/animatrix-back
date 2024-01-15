import { User } from 'src/auth/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('animes')
export class Anime {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('varchar')
  name: string;
  @Column('int', { default: 0 })
  episode: number;
  @Column('float', { default: 0 })
  episodeMinute: number;
  @Column('int', { nullable: true })
  nextEpisode?: number;
  @Column('varchar')
  url: string;
  @Column('varchar', { nullable: true })
  comment?: string;
  @ManyToOne(() => User, (user) => user.animes)
  user: User;
}
