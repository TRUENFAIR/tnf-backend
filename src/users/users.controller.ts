import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/@common/guards/jwt-auth.guard";
import { UsersService } from "./users.service";

@ApiTags("Users")
@UseGuards(JwtAuthGuard)
@Controller("/users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}
}
