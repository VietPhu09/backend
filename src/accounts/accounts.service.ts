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
import { plainToClass } from 'class-transformer';
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
      const findAccount = await this.accountRepository.findOne({
        where: { email },
      });
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
    const accounts = await this.accountRepository
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.role', 'role')
      .leftJoinAndSelect('account.quizzes', 'quiz')
      .leftJoinAndSelect('account.posts', 'posts')
      .leftJoinAndSelect('quiz.account', 'quizAccount')
      .leftJoinAndSelect('posts.images', 'images')
      .leftJoinAndSelect('account.events', 'events')
      .leftJoinAndSelect('events.post', 'post')
      .leftJoinAndSelect('events.qrs', 'qrs')
      .getMany();
    return {
      length: accounts.length,
      accounts,
    };
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
    return account;
  }
  async update(id: number, updateAccountDto: UpdateAccountDto) {
    console.log(updateAccountDto);
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.startTransaction();
      const account = await this.accountRepository.findOne({ where: { id } });
      if (!account) {
        return {
          message: "Account doesn't exits in system !",
          statusCode: HttpStatus.NOT_FOUND,
        };
      }
      if (updateAccountDto.password && !updateAccountDto.comfirmPassword) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message:
            'If you want to change password, please enter full password and comfirmPassword',
        };
      }
      if (updateAccountDto.password && updateAccountDto.comfirmPassword) {
        if (updateAccountDto.password !== updateAccountDto.comfirmPassword) {
          return {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Passwords do not match',
          };
        }
        updateAccountDto.password = await hashPassword(
          updateAccountDto.password,
        );

        delete updateAccountDto.comfirmPassword;
      }
      if (updateAccountDto?.files?.length > 0) {
        const image = await this.imageRepository.findOne({
          where: { account: account.id },
        });
        image.image_url = updateAccountDto.files[0];
        await queryRunner.manager.update(Image, image.id, image);
        delete updateAccountDto.files;
      }
      await queryRunner.manager.update('account', id, updateAccountDto);
      await queryRunner.commitTransaction();
      return {
        message: 'Update account Successful',
        statusCode: HttpStatus.ACCEPTED,
      };
    } catch (err) {
      console.log(err);

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
      const account = await this.accountRepository.findOne({ where: { id } });
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
  async forgotPassword(email: string): Promise<Account | Object> {
    try {
      const account = await this.accountRepository.findOne({
        where: { email },
      });
      return account;
    } catch (error) {}
  }
}
