import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccountsService } from 'src/accounts/accounts.service';
import { ROLES_KEY } from 'src/decorator/roles.decorator';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accountService: AccountsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<any[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { id } = context.switchToHttp().getRequest().headers;
    const findAccount: any = await this.accountService.findOne(id);
    return requiredRoles.some((role) => {
      console.log(findAccount);

      return role === findAccount?.role?.role_name;
    });
  }
}
