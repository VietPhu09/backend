import { Image } from 'src/image/entities/image.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
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
  @OneToOne(() => Role, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  role: number = 2;
  @OneToMany(() => Post, (post) => post.account)
  images: Image[];
  
}
