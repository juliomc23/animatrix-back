import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text')
  fullname: string;
  @Column('text', { unique: true })
  email: string;
  @Column('text')
  password: string;
}
