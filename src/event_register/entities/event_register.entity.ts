import { Account } from 'src/accounts/entities/account.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Qr } from 'src/qr/entities/qr.entity';
import {
  Column,
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
  @ManyToOne(() => Post, (account) => account.events, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
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
  @Column({ default: false })
  status: boolean;
  @CreateDateColumn()
  createAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
}
