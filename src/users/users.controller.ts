import { Controller, UseGuards } from "@nestjs/common";
import { Body, Get, Post } from "@nestjs/common/decorators";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "src/@common/decorators/user.decorator";
import { UserInfoDto } from "src/@common/dtos/userInfo.dto";
import { JwtAuthGuard } from "src/@common/guards/jwt-auth.guard";
import { OnlyAdminGuard } from "src/@common/guards/only-admin.guards";
import { ListUserResponseDto } from "src/topics/dtos/listTopics.dto";
import { CreateUserBodyDto, CreateUserResponseDto } from "./dto/createUser.dto";
import { ProfileResponseDto } from "./dto/profile.dto";
import { UsersService } from "./users.service";

@ApiTags("Users")
@UseGuards(JwtAuthGuard)
@Controller("/users")
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @UseGuards(OnlyAdminGuard)
  @ApiResponse({ status: 201, type: [CreateUserResponseDto] })
  @Post("/create")
  async createUser(@Body() body: CreateUserBodyDto, @User() userInfo: UserInfoDto): Promise<CreateUserResponseDto> {
    return this.userService.createUser(body, userInfo);
  }

  @ApiResponse({ status: 200, type: ProfileResponseDto })
  @Get("/profile")
  async profile(@User() userInfo: UserInfoDto): Promise<ProfileResponseDto> {
    return this.userService.profile(userInfo);
  }

  @ApiResponse({ status: 200, type: [ListUserResponseDto] })
  @Get("/users-list-for-forum")
  async usersListFormForum(@User() userInfo: UserInfoDto): Promise<ListUserResponseDto[]> {
    return this.userService.usersListFormForum(userInfo);
  }
}
