import { Account } from 'src/accounts/entities/account.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  role_name: string;
  @OneToMany(() => Account, (account) => account.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  account: number;
  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
