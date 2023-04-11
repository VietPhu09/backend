import { Account } from 'src/accounts/entities/account.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class ResetPassword {
  @PrimaryGeneratedColumn()
  id?: number;
  @OneToOne(() => Account, (account) => account.id)
  @JoinColumn()
  account: number;
  @Column()
  secret: string;
  @CreateDateColumn()
  createAt?: Date;
  @UpdateDateColumn()
  updateAt?: Date;
}
