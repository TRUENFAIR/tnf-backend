import { Body, Controller, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginInputDto, LoginResponseDto } from "./dtos/login.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, type: LoginResponseDto })
  @Post("/login")
  async login(@Body() input: LoginInputDto) {
    return this.authService.login(input);
  }
}
