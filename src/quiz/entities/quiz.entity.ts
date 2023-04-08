import { Account } from 'src/accounts/entities/account.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('json')
  quiz: { question: string; answer: string[] }[];
  @ManyToOne(() => Account, (account) => account.id)
  business: number;
  @ManyToOne(() => Account, (account) => account.id)
  account: number;
}
