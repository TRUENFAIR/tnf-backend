import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { UserInfoDto } from "src/@common/dtos/userInfo.dto";
import { CreateTopicDto } from "./dtos/createTopic.dto";
import { ListTopicsResponseDto } from "./dtos/listTopics.dto";
import { UpdateTopicBodyDto } from "./dtos/updateTopic.dto";

@Injectable()
export class TopicsService {
  constructor(private readonly prismaClint: PrismaClient) { }

  async listTopics(userInfo: UserInfoDto): Promise<ListTopicsResponseDto> {
    const assignedTopics = await this.prismaClint.topic.findMany({
      select: {
        id: true,
        name: true
      },
      where: {
        isactive: true,
        TopicUsers: {
          some: {
            userid: userInfo.userId
          }
        },
        RefDatum_Topic_topictypeToRefDatum: {
          refdatacode: "TOPIC_TYPE.FORUM"
        }
      },
      orderBy: {
        createddatetime: "asc"
      }
    });

    let usersList: string[] = [userInfo.userId];
    if (userInfo.role.name === "Admin") {
      const users = await this.prismaClint.user.findMany({
        select: { id: true },
        where: {
          NOT: {
            id: userInfo.userId
          },
          isactive: true,
          tenant: userInfo.admin.tenantId,
        }
      });
      usersList = [...users.map(user => user.id)];
    }


    const createdTopics = await this.prismaClint.topic.findMany({
      select: {
        id: true,
        name: true
      },
      where: {
        isactive: true,
        createduser: {
          in: usersList
        }
      }
    });

    return {
      assignedTopics,
      createdTopics
    };
  }

  async createTopic(body: CreateTopicDto, userInformation: UserInfoDto): Promise<string> {
    const { name, userIdList } = body;
    const Topic = await this.prismaClint.topic.create({
      data: {
        name: name,
        startdate: new Date(),
        createddatetime: new Date(),
        isactive: true,
        Tenant_Topic_tenantToTenant: {
          connect: {
            id: userInformation.admin.tenantId
          }
        },
        Tenant_Topic_createdtenantToTenant: {
          connect: {
            id: userInformation.admin.tenantId
          }
        },
        User_Topic_createduserToUser: {
          connect: {
            id: userInformation.userId
          }
        },
        RefDatum_Topic_topictypeToRefDatum: {
          connect: {
            refdatacode: "TOPIC_TYPE.FORUM"
          }
        },
        RefDatum_Topic_languageToRefDatum: {
          connect: {
            refdatacode: "LANGUAGE.ENGISH"
          }
        },
        TopicInstance: {
          create: {
            createddatetime: new Date(),
            createduser: userInformation.userId,
            createdtenant: userInformation.admin.tenantId,
            isactive: true,
          }
        },
        TopicUsers: {
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
    await this.prismaClint.topic.update({
      where: {
        id: id
      },
      data: {
        name: name,
        updateddatetime: new Date(),
        User_Topic_updateduserToUser: {
          connect: {
            id: userInformation.userId
          }
        },
        Tenant_Topic_updatedtenantToTenant: {
          connect: {
            id: userInformation.admin.tenantId
          }
        },
        TopicUsers: {
          createMany: {
            data: newlyAddedUsers.map((userId) => ({
              userid: userId,
              createdtenant: userInformation.admin.tenantId,
              createduser: userInformation.userId,
              isactive: true,
              createddatetime: new Date()
            })),
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
        },
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
