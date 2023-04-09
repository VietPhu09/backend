import { Account } from 'src/accounts/entities/account.entity';
import { EventRegister } from 'src/event_register/entities/event_register.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Qr {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'text' })
  qr_link: string;
  @ManyToOne(() => Account, (account) => account.qr, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  account: number;

  @ManyToOne(() => EventRegister, (event) => event.qrs, {
    onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  })
  @JoinColumn()
  events: number;
  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
