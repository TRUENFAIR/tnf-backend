import { Controller, UseGuards } from "@nestjs/common";
import { Get } from "@nestjs/common/decorators";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/@common/guards/jwt-auth.guard";
import { ListUserResponseDto } from "src/create-topics/dtos/listTopics.dto";
import { UsersService } from "./users.service";

@ApiTags("Users")
@UseGuards(JwtAuthGuard)
@Controller("/users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiResponse({ status: 200, type: ListUserResponseDto })
  @Get("/userList")
  async listOfUsers() {
    return this.userService.listOfUsers();
  }
}
