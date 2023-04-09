import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { Repository, getManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/image/entities/image.entity';
import { AuthService } from 'src/auth/auth.service';
import { hashPassword } from 'src/helpers/password_hash.helper';
import { Connection } from 'typeorm';
@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly authService: AuthService,
    private readonly connection: Connection,
  ) {}
  async create(createAccountDto: CreateAccountDto) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.startTransaction();
      const { email, files } = createAccountDto;
      const findAccount = await this.accountRepository.findOne({ email });
      if (findAccount) {
        return {
          message: 'Account already exists in the system, please re-register!',
          statusCode: HttpStatus.BAD_REQUEST,
        };
      }
      createAccountDto.password = await hashPassword(createAccountDto.password);
      const id = await getManager().transaction(
        async (transactionalEntityManager) => {
          const account = await this.accountRepository.create(createAccountDto);
          const saveAccount = await transactionalEntityManager.save(account);
          const accountId = saveAccount.id;
          return accountId;
        },
      );

      for (let i = 0; i < files.length; i++) {
        const image = await this.imageRepository.create({
          image_url: files[i],
          account: id,
        });
        await queryRunner.manager.save('image', image);
      }
      await queryRunner.commitTransaction();
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Create Account Successfully !',
      };
    } catch (error) {
      console.log(error);

      await queryRunner.rollbackTransaction();
      throw new HttpException('Create Account Fail !', HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }
  login(account: { email: string }) {
    return this.authService.login(account);
  }
  async findAll() {
    return await this.accountRepository
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.role', 'role')
      .getMany();
  }

  async findOne(id: number): Promise<Account | undefined | Object> {
    const account = await this.accountRepository
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.role', 'role')
      .leftJoinAndSelect('account.quizzes', 'quiz')
      .leftJoinAndSelect('account.posts', 'posts')
      .leftJoinAndSelect('quiz.account', 'quizAccount')
      .leftJoinAndSelect('posts.images', 'images')
      .leftJoinAndSelect('account.events', 'events')
      .leftJoinAndSelect('events.post', 'post')
      .leftJoinAndSelect('events.qrs', 'qrs')
      .where('account.id =:id', { id })
      .getOne();
    if (!account) {
      return {
        message: `Account doesn't exits in system !`,
        statusCode: HttpStatus.NOT_FOUND,
      };
    }
    return account;
  }
  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.startTransaction();
      const account = await this.accountRepository.findOne({ id });
      if (!account) {
        return {
          message: "Account doesn't exits in system !",
          statusCode: HttpStatus.NOT_FOUND,
        };
      }
      await queryRunner.manager.update('account', id, updateAccountDto);
      await queryRunner.commitTransaction();
      return {
        message: 'Update account Successful',
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
      const account = await this.accountRepository.findOne({ id });
      if (!account) {
        return {
          message: "Account doesn't exits in system !",
          statusCode: HttpStatus.NOT_FOUND,
        };
      }
      await queryRunner.manager.remove('account', account);
      await queryRunner.commitTransaction();
      return {
        message: 'Delete account Successful',
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
