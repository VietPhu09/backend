import { Account } from 'src/accounts/entities/account.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('json')
  quiz: { question: string; answer: string[] }[];
  @ManyToOne(() => Account, (account) => account.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  business: number;
  @ManyToOne(() => Account, (account) => account.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  account: number;
  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
