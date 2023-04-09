import { Account } from 'src/accounts/entities/account.entity';
import { Image } from 'src/image/entities/image.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Qr } from 'src/qr/entities/qr.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class EventRegister {
  @PrimaryGeneratedColumn()
  id: number;
  //   @Column({ type: 'text' })
  //   qr_link: string;

  @ManyToOne(() => Post, (account) => account.events)
  @JoinColumn()
  post: number;
  @ManyToOne(() => Account, (account) => account.events, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  account: number;
  @OneToMany(() => Qr, (qr) => qr.events)
  qrs: number;
  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
