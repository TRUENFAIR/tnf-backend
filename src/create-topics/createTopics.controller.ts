import { Body, Controller, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "src/@common/decorators/user.decorator";
import { UserInfoDto } from "src/@common/dtos/userInfo.dto";
import { JwtAuthGuard } from "src/@common/guards/jwt-auth.guard";
import { CreateTopicsService } from "./createTopics.service";
import { CreateTopicDtp } from "./dtos/createTopic.dto";
@ApiTags("Topics")
@UseGuards(JwtAuthGuard)
@Controller("topics")
export class CreateTopicsController {
  constructor(private readonly CreateTopicService: CreateTopicsService) {}
  @ApiResponse({ status: 201, type: String })
  @Post("/create")
  async createTopic(@Body() body: CreateTopicDtp, @User() userInfo: UserInfoDto) {
    return this.CreateTopicService.createTopic(body, userInfo);
  }
  @ApiResponse({ status: 201, type: String })
  @Patch("/update")
  async updateTopic(@Body() body: CreateTopicDtp, @User() userInfo: UserInfoDto) {
    return this.CreateTopicService.updateTopic(body, userInfo);
  }
  @ApiResponse({ status: 201, type: String })
  @Post("/delete")
  async deleteTopic(userInformation: UserInfoDto) {
    return this.CreateTopicService.deleteTopic(userInformation);
  }
}
