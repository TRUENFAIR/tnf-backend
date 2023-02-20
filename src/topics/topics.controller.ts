import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "src/@common/decorators/user.decorator";
import { UserInfoDto } from "src/@common/dtos/userInfo.dto";
import { JwtAuthGuard } from "src/@common/guards/jwt-auth.guard";
import { CreateTopicBodyDto } from "./dtos/createTopic.dto";
import { TopicsService } from "./topics.service";

@ApiTags("Topic")
@UseGuards(JwtAuthGuard)
@Controller("/topics")
export class TopicsController {
  constructor(private readonly topicService: TopicsService) {}

  @ApiResponse({ status: 201, type: String })
  @Post("/create")
  async create(@Body() body: CreateTopicBodyDto, @User() userInfo: UserInfoDto) {
    return this.topicService.create(body, userInfo);
  }
}
