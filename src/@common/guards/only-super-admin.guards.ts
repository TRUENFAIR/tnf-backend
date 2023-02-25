import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserInfoDto } from "../dtos/userInfo.dto";

@Injectable()
export class OnlySuperAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const user = context.switchToHttp().getRequest().user as UserInfoDto;
    return user.role.code === process.env.SUPER_ADMIN_ROLE_NAME;
  }
}
