import { Account } from "src/accounts/entities/account.entity";
import { Image } from "src/image/entities/image.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  content: string; @Column()
  @Column()
  title: string;
  @Column()
  email: string;
  @ManyToOne(() => Account, (account) => account.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  account: number;
  @OneToMany(() => Image, image => image.post)
  images: Image[]
}
