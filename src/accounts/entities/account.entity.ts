import { Image } from 'src/image/entities/image.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  address: string;
  @Column()
  phone_number: string;
  @Column()
  sex: string;
  @Column()
  password: string;
  @ManyToOne(() => Role, (role) => role.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  role: number = 2;

  @OneToMany(() => Quiz, (quiz) => quiz.account)
  quizzes: Quiz[];
  @OneToMany(() => Post, (post) => post.account)
  images: Image[];
}
