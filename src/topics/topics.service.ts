import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { UserInfoDto } from "src/@common/dtos/userInfo.dto";
import { CreateTopicBodyDto } from "./dtos/createTopic.dto";

@Injectable()
export class TopicsService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(body: CreateTopicBodyDto, userInfo: UserInfoDto): Promise<string> {
    const { name, description, userIdList } = body;

    const topic = await this.prisma.topic.create({
      data: {
        name: name,
        description: description,
        topictype_: {
          connect: {
            refdatacode: "TOPIC_TYPE.FORUM"
          }
        },
        language_: {
          connect: {
            refdatacode: "LANGUAGE.ENGISH"
          }
        },
        startdate: new Date(),
        createddatetime: new Date(),
        tenant: userInfo.admin.tenantId,
        createdtenant: userInfo.admin.tenantId,
        createduser: userInfo.userId,
        isactive: true,
        topicinstances_topic_: {
          create: {
            createdtenant: userInfo.admin.tenantId,
            createduser: userInfo.userId,
            createddatetime: new Date(),
            isactive: true
          }
        },
        topicusers_topic_: {
          createMany: {
            data: userIdList.map((userId) => ({
              userid: userId,
              createdtenant: userInfo.admin.tenantId,
              createduser: userInfo.userId,
              createddatetime: new Date(),
              isactive: true
            }))
          }
        }
      },
      select: {
        id: true
      }
    });

    return topic.id;
  }
}
