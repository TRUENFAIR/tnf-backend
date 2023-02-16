import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserInfoDto } from "src/@common/dtos/userInfo.dto";
import { UsersService } from "src/users/users.service";
import { LoginInputDto, LoginResponseDto } from "./dtos/login.dto";
import { PasswordService } from "./password.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(input: LoginInputDto): Promise<UserInfoDto> {
    const user = await this.userService.findOne(input.username);
    if (user && (await this.passwordService.compare(input.password, user.password))) {
      return {
        userId: user.userId,
        username: user.username,
        fullname: user.fullname,
        admin: user.admin,
        role: user.role
      };
    }

    return null;
  }

  async login(input: LoginInputDto): Promise<LoginResponseDto> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException("Incorrect username or password!");
    }

    return {
      accessToken: this.jwtService.sign(user)
    };
  }
}
