import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Image } from 'src/image/entities/image.entity';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Image])],
  controllers: [PostsController],
  providers: [PostsService, Repository],
})
export class PostsModule {}
