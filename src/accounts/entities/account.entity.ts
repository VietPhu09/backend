import { EventRegister } from 'src/event_register/entities/event_register.entity';
import { Image } from 'src/image/entities/image.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Qr } from 'src/qr/entities/qr.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Exclude()
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
  @OneToMany(() => Post, (post) => post.account)
  posts: Post[];
  @OneToMany(() => Quiz, (quiz) => quiz.business)
  quizzes: Quiz[];
  @OneToMany(() => Post, (post) => post.account)
  images: Image[];

  @OneToOne(() => Qr, (qr) => qr.account)
  qr: Qr;
  @OneToMany(() => EventRegister, (event) => event.account, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  events: EventRegister[];
  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
