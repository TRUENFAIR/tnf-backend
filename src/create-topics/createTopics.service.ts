import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { UserInfoDto } from "src/@common/dtos/userInfo.dto";
import { CreateTopicDtp } from "./dtos/createTopic.dto";

@Injectable()
export class CreateTopicsService {
  constructor(private readonly prismaClint: PrismaClient) {}

  async createTopic(body: CreateTopicDtp, userInformation: UserInfoDto): Promise<string> {
    const { name, description, userIdList } = body;
    const Topic = await this.prismaClint.topic.create({
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
        tenant: userInformation.admin.tenantId,
        createdtenant: userInformation.admin.tenantId,
        createduser: userInformation.userId,
        isactive: true,
        topicinstances_topic_: {
          create: {
            createddatetime: new Date(),
            createduser: userInformation.userId,
            createdtenant: userInformation.admin.tenantId,
            isactive: true
          }
        },
        topicusers_topic_: {
          createMany: {
            data: userIdList.map((userId) => ({
              userid: userId,
              createdtenant: userInformation.admin.tenantId,
              createduser: userInformation.userId,
              isactive: true,
              createddatetime: new Date()
            }))
          }
        }
      },
      select: {
        id: true
      }
    });
    return Topic.id;
  }
}
