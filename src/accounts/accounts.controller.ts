import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  hashPassword,
  hashResetPassword,
} from 'src/helpers/password_hash.helper';
import { EmailService } from 'src/email/email.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ResetPassword } from 'src/reset_password/entities/reset_password.entity';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { comparePassword } from 'src/helpers/password_compare.helper';
import { templateResetPassword } from 'src/helpers/templateResetPassword';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('account')
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly sendMailService: EmailService,
    @InjectRepository(ResetPassword)
    private readonly resetPasswordRepository: Repository<ResetPassword>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}
  @Post('/register')
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  login(@Body() account) {
    console.log(account);
    return this.accountsService.login({ email: account.email });
  }
  // @UseGuards(AuthGuard('jwt'))
  @Get()
  // @Roles(Role.ADMIN)
  async findAll() {
    return await this.accountsService.findAll();
  }
  // @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() body: { email: string }, @Req() req) {
    try {
      const account: any = await this.accountsService.forgotPassword(
        body.email,
      );
      if (!account) {
        return {
          message: 'Account not found in our system !',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }
      req.session.account = account.id;
      const { secret, paddedNumber } = await hashResetPassword();
      await this.sendMailService.sendEmailToResetPassword(
        body.email,
        'RESET YOUR PASSWORD',
        templateResetPassword(paddedNumber),
      );
      const checkAccountResetPassword =
        await this.resetPasswordRepository.findOne({
          where: { account: account.id },
        });
      // Kiểm tra xem account này đã reset password chưa
      if (checkAccountResetPassword) {
        // Nếu có rồi thì xóa đi
        await this.resetPasswordRepository.delete({ account: account.id });
      }
      // Nếu chưa có thì tạo
      const resetEntity = await this.resetPasswordRepository.create({
        secret,
        account: account.id,
      });
      // Lưu mã token vào để tí xác nhận mã
      await this.resetPasswordRepository.save(resetEntity);
      return {
        message: 'OTP was send to your email !',
        statusCode: HttpStatus.ACCEPTED,
      };
    } catch (error) {
      console.log(error);
      return {
        message: 'Server is wrong happend, Please  try later !',
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
  @Post('/confirm-password')
  async confirmPasswod(
    @Req() req,
    @Body()
    body: { secret: string; newPassword: string; confirmNewPassword: string },
  ) {
    try {
      const { account } = req.session;
      if (account) {
        const secret = await this.resetPasswordRepository.findOne({
          where: {
            account: account,
          },
        });
        const isCompareNumber = await comparePassword(
          body.secret,
          secret.secret,
        );
        if (body.newPassword !== body.confirmNewPassword) {
          return {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'New password must same ComfirmPassword',
          };
        }
        if (!isCompareNumber) {
          return {
            message: 'Confirmation code is incorrect !',
            statusCode: HttpStatus.BAD_REQUEST,
          };
        }
        const accounts = await this.accountRepository.findOne({
          where: { id: account },
        });
        if (accounts) {
          accounts.password = body.newPassword;
          accounts['comfirmPassword'] = body.newPassword;
          return await this.accountsService.update(accounts.id, accounts);
        }
      } else {
        return {
          message: 'Please forgot email again !',
        };
      }
    } catch (error) {}
  }
  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.accountsService.remove(+id);
  }
}
