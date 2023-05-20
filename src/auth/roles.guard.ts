import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from 'src/accounts/accounts.service';
import { ROLES_KEY } from 'src/decorator/roles.decorator';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accountService: AccountsService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<any[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const token = context.switchToHttp().getRequest().headers;
    const account = this.jwtService.verify(token?.authorization?.split(' ')[1]);
    const { id } = account;
    const findAccount: any = await this.accountService.findOne(id);
    return requiredRoles.some((role) => {
      return role === findAccount?.role?.role_name;
    });
  }
}
