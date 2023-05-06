import { Account } from 'src/accounts/entities/account.entity';
import { EventRegister } from 'src/event_register/entities/event_register.entity';
import { Image } from 'src/image/entities/image.entity';
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
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  content: string;
  @Column()
  title: string;
  @Column()
  slot: number;
  @Column()
  startDay: string;
  @Column()
  startTime: string;
  @ManyToOne(() => Account, (account) => account.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  account: number;
  @OneToMany(() => Image, (image) => image.post)
  images: Image[];
  @OneToMany(() => EventRegister, (event) => event.post)
  events: Image[];
  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
