import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';
import { Injectable, HttpStatus } from '@nestjs/common';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}
  async create(createQuizDto: CreateQuizDto) {
    try {
      await this.quizRepository.save(createQuizDto);
      return {
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      console.log(error);

      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async findAll() {}

  findOne(id: number) {
    return `This action returns a #${id} `;
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} `;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
