import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginInputDto } from "./dtos/login.dto";
import { PasswordService } from "./password.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly passwordService: PasswordService) {}

  @Post("/login")
  async login(@Body() input: LoginInputDto) {
    return this.authService.login(input);
  }
}
