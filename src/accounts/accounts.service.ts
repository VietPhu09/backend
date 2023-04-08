import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { Repository, getRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/image/entities/image.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}
  async create(createAccountDto: CreateAccountDto) {
    try {
      const { avatar } = createAccountDto;
      const image = this.imageRepository.create({})
      const account = await this.accountRepository.save(createAccountDto);
      this.accountRepository.create();
    } catch (error) {}
  }

  findAll() {
    return `This action returns all accounts`;
  }

  async findOne(id: number): Promise<Account | undefined> {
    return await getRepository(Account)
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.role', 'role')
      .where('account.id = :id', { id })
      .getOne();
  }
  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
