import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Connection, Repository, getManager } from 'typeorm';
import { Post } from './entities/post.entity';
import { Image } from 'src/image/entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}
  async create(createPostDto: CreatePostDto) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.startTransaction();
      const { files, account } = createPostDto;
      const id = await getManager().transaction(
        async (transactionalEntityManager) => {
          const post = await this.postRepository.create(createPostDto);
          const savePost = await transactionalEntityManager.save(post);
          const postId = savePost.id;
          return postId;
        },
      );
      for (let i = 0; i < files.length; i++) {
        const image = await this.imageRepository.create({
          image_url: files[i],
          post: id,
        });
        await queryRunner.manager.save('image', image);
      }
      await queryRunner.commitTransaction();
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Create Post Successfully !',
      };
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new HttpException('Create Post Fail !', HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.account', 'account')
      .leftJoinAndSelect('post.images', 'images')
      .leftJoinAndSelect('post.events', 'events')
      .leftJoinAndSelect('events.account', 'eventAccount')
      .getMany();
    if (!posts) {
      return {
        message: `Post doesn't exits in system !`,
        statusCode: HttpStatus.NOT_FOUND,
      };
    }
    return posts;
  }

  async findOne(id: number) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.account', 'account')
      .leftJoinAndSelect('post.images', 'images')
      .leftJoinAndSelect('post.events', 'events')
      .leftJoinAndSelect('events.account', 'eventAccount')
      .where('post.id =:id', { id })
      .getOne();
    if (!post) {
      return {
        message: `Post doesn't exits in system !`,
        statusCode: HttpStatus.NOT_FOUND,
      };
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.startTransaction();
      const { files } = updatePostDto;
      if (files.length > 0) {
        await queryRunner.manager.delete('image', { post: id });
        for (let i = 0; i < files.length; i++) {
          const image = await this.imageRepository.create({
            image_url: files[i],
            post: id,
          });
          await queryRunner.manager.save('image', image);
        }
      }
      delete updatePostDto.files;
      const findOnePost = await this.postRepository.findOne({ where: { id } });
      if (!findOnePost) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Post doesn't exits in system !",
        };
      }
      await queryRunner.manager.update('post', id, updatePostDto);
      await queryRunner.commitTransaction();
      return {
        message: 'Update Post Successful',
        statusCode: HttpStatus.ACCEPTED,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.startTransaction();
      const post = await this.postRepository.findOne({ where: { id } });
      if (!post) {
        return {
          message: "Post doesn't exits in system !",
          statusCode: HttpStatus.NOT_FOUND,
        };
      }
      await queryRunner.manager.remove('post', post);
      await queryRunner.commitTransaction();
      return {
        message: 'Delete post Successful',
        statusCode: HttpStatus.ACCEPTED,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
