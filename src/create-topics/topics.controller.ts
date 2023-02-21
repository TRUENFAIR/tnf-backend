import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { Delete } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "src/@common/decorators/user.decorator";
import { UserInfoDto } from "src/@common/dtos/userInfo.dto";
import { JwtAuthGuard } from "src/@common/guards/jwt-auth.guard";
import { CreateTopicDto } from "./dtos/createTopic.dto";
import { ListTopicsQueryDto } from "./dtos/listTopics.dto";
import { UpdateTopicBodyDto } from "./dtos/updateTopic.dto";
import { TopicsService } from "./topics.service";
@ApiTags("Topics")
@UseGuards(JwtAuthGuard)
@Controller("topics")
export class TopicsController {
  constructor(private readonly TopicService: TopicsService) {}

  @ApiResponse({ status: 200, type: String })
  @Get("list-topics")
  async listTopics(@Query() query: ListTopicsQueryDto, @User() userInfo: UserInfoDto) {
    return this.TopicService.listTopics(query, userInfo);
  }

  @ApiResponse({ status: 201, type: String })
  @Post("/create")
  async createTopic(@Body() body: CreateTopicDto, @User() userInfo: UserInfoDto) {
    return this.TopicService.createTopic(body, userInfo);
  }

  @ApiResponse({ status: 201, type: String })
  @Patch("/update/:id")
  async updateTopic(@Param("id") id: string, @Body() body: UpdateTopicBodyDto, @User() userInfo: UserInfoDto) {
    return this.TopicService.updateTopic(id, body, userInfo);
  }

  @ApiResponse({ status: 200, type: String })
  @Delete("/delete/:id")
  async deleteTopic(@Param("id") id: string, @User() userInformation: UserInfoDto) {
    return this.TopicService.deleteTopic(id, userInformation);
  }
}
