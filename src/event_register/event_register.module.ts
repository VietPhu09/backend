import { Module } from '@nestjs/common';
import { EventRegisterService } from './event_register.service';
import { EventRegisterController } from './event_register.controller';
import { EmailModule } from 'src/email/email.module';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRegister } from './entities/event_register.entity';
import { AccountsModule } from 'src/accounts/accounts.module';
import { Account } from 'src/accounts/entities/account.entity';
import { Image } from 'src/image/entities/image.entity';
import { Qr } from 'src/qr/entities/qr.entity';

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([EventRegister, Account, Image, Qr]),
    AccountsModule,
  ],
  controllers: [EventRegisterController],
  providers: [EventRegisterService, Repository],
  exports: [Repository],
})
export class EventRegisterModule {}
