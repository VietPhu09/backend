import { Account } from 'src/accounts/entities/account.entity';
import { Post } from 'src/posts/entities/post.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  image_url: string;
  @ManyToOne(() => Post, (post) => post.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  post: number;
  @OneToOne(() => Account, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  account: number;
  // hotel: number;
  // @ManyToOne(() => Spa, (spa) => spa.images, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // })
  // spa: number;
  // @ManyToOne(() => Treatment, (treatment) => treatment.images, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // })
  // treatment: number;
  // @ManyToOne(() => Restaurant, (restaurant) => restaurant.images, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // })
  // restaurant: number;
  // @ManyToOne(() => Dish, (dish) => dish.images, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // })
  // dish: number;
  // @ManyToOne(() => Gym, (gym) => gym.images, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // })
  // gym: number;
  // @ManyToOne(() => Workout, (workout) => workout.images, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // })
  // workout: number;
  // @ManyToOne(() => BodyRecovery, (bodyRecovery) => bodyRecovery.images, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // })
  // body_recovery: number;
}
