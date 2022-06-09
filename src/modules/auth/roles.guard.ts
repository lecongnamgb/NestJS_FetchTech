import { ROLES_KEY } from './../../decorators/roles.decorator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/enums/role.enum';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      console.log(requiredRoles);
      if (!requiredRoles) {
        return true;
      }
      const { headers } = context.switchToHttp().getRequest();
      const accessToken = headers.authorization?.split(' ')[1];
      if (!accessToken) {
        return false;
      }
      const decodedToken = jwt.verify(accessToken, '123');
      if (!decodedToken) {
        console.log('Error happens when decode jwt');
        return false;
      }
      const userRole = decodedToken['role'];
      return requiredRoles.some((role) => userRole.includes(role));
    } catch (err) {
      console.log(`Whoops! ${err}`);
      return false;
    }
  }
}
