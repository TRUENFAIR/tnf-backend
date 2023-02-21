import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { UserInfoDto } from "src/@common/dtos/userInfo.dto";
import { CreateTopicDto } from "./dtos/createTopic.dto";
import { ListTopicsQueryDto, ListTopicsResponseDto } from "./dtos/listTopics.dto";
import { UpdateTopicBodyDto } from "./dtos/updateTopic.dto";

@Injectable()
export class TopicsService {
  constructor(private readonly prismaClint: PrismaClient) {}

  async listTopics(query: ListTopicsQueryDto, userInfo: UserInfoDto): Promise<ListTopicsResponseDto[]> {
    const { type } = query;

    if (type === "all-topics") {
      return this.prismaClint.topic.findMany({
        select: {
          id: true,
          name: true
        },
        where: {
          isactive: true,
          OR: [
            {
              createduser: userInfo.userId
            },
            {
              topicusers_topic_: {
                every: {
                  userid: userInfo.userId
                }
              }
            }
          ]
        }
      });
    } else if (type === "my-topics") {
      return this.prismaClint.topic.findMany({
        select: {
          id: true,
          name: true
        },
        where: {
          isactive: true,
          createduser: userInfo.userId
        }
      });
    }

    return [];
  }

  async createTopic(body: CreateTopicDto, userInformation: UserInfoDto): Promise<string> {
    const { name, userIdList } = body;
    const Topic = await this.prismaClint.topic.create({
      data: {
        name: name,
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

  async updateTopic(id: string, body: UpdateTopicBodyDto, userInformation: UserInfoDto) {
    const { name, removedUsers = [], newlyAddedUsers = [] } = body;
    console.log(removedUsers);
    await this.prismaClint.topic.update({
      where: {
        id: id
      },
      data: {
        name: name,
        updateddatetime: new Date(),
        updateduser: userInformation.userId,
        updatedtenant: userInformation.admin.tenantId,
        topicusers_topic_: {
          createMany: {
            data: newlyAddedUsers.map((userId) => ({
              userid: userId,
              createdtenant: userInformation.admin.tenantId,
              createduser: userInformation.userId,
              isactive: true,
              createddatetime: new Date()
            }))
          },
          updateMany: removedUsers.map((userId) => ({
            where: {
              userid: userId
            },
            data: {
              updateddatetime: new Date(),
              updateduser: userInformation.userId,
              updatedtenant: userInformation.admin.tenantId,
              isactive: false
            }
          }))
        }
      }
    });
    return "Record Updated Successfully";
  }

  async deleteTopic(id: string, userInformation: UserInfoDto) {
    await this.prismaClint.topic.update({
      where: {
        id: id
      },
      data: {
        updateddatetime: new Date(),
        updateduser: userInformation.userId,
        updatedtenant: userInformation.admin.tenantId,
        isactive: false
      }
    });
    return "Record Deleted Successfully";
  }
}
