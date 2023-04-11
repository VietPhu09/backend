import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Image } from 'src/image/entities/image.entity';
import { AuthService } from 'src/auth/auth.service';
import { jwtConstants } from 'src/auth/constants';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/roles.guard';
import { Repository } from 'typeorm';
import { EmailModule } from 'src/email/email.module';
import { ResetPassword } from 'src/reset_password/entities/reset_password.entity';
@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([Account, Image, ResetPassword]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AccountsController],
  providers: [
    AccountsService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    Repository,
  ],
  exports: [AccountsService, Repository],
})
export class AccountsModule {}
