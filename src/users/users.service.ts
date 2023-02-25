import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { UserInfoDto } from "src/@common/dtos/userInfo.dto";
import concatUsernameAndTenant from "src/@common/utils/concatUsernameAndTenant";
import { PasswordService } from "src/auth/password.service";
import { ListUserResponseDto } from "src/topics/dtos/listTopics.dto";
import { CreateUserBodyDto, CreateUserResponseDto } from "./dto/createUser.dto";
import { FindOneResponseDto } from "./dto/findOneResponse.dto";
import { ProfileResponseDto } from "./dto/profile.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaClient, private readonly passwordService: PasswordService) { }

  async findOne(username: string): Promise<FindOneResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        login: username
      },
      select: {
        id: true,
        login: true,
        password: true,
        createduser: true,
        Tenant_User_tenantToTenant: {
          select: {
            id: true,
            loginname: true
          }
        },
        UserProfile_UserProfile_userToUser: {
          select: {
            firstname: true,
            lastname: true
          }
        },
        UserRoleMap_UserRoleMap_userToUser: {
          select: {
            Role: {
              select: {
                name: true,
                code: true,
              }
            }
          }
        },
      }
    });

    if (user) {
      const userProfile = user.UserProfile_UserProfile_userToUser;
      const fullname = `${userProfile?.firstname || ""} ${userProfile?.lastname || ""}`.trim();

      return {
        userId: user.id,
        username: user.login,
        password: user.password,
        fullname: fullname || null,
        admin: {
          userId: user.createduser,
          tenantId: user.Tenant_User_tenantToTenant.id,
          loginname: user.Tenant_User_tenantToTenant.loginname
        },
        role: {
          name: user.UserRoleMap_UserRoleMap_userToUser.Role?.name,
          code: user.UserRoleMap_UserRoleMap_userToUser.Role?.code
        }
      };
    }

    return null;
  }

  async createUser(body: CreateUserBodyDto, userInfo: UserInfoDto): Promise<CreateUserResponseDto> {
    const password =
      body.firstName.replace(" ", "").slice(0, 3) +
      `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}` +
      ("0" + new Date()?.getDate()).slice(-2) +
      new Date()?.getMilliseconds();

    const user = await this.prisma.user.create({
      data: {
        login: body.phone,
        password: await this.passwordService.hash(password),
        createddatetime: new Date(),
        isactive: true,
        RefDatum_User_usertypeToRefDatum: {
          connect: {
            refdatacode: "USER_TYPE.USER"
          }
        },
        Tenant_User_tenantToTenant: {
          connect: {
            id: userInfo.admin.tenantId
          }
        },
        Tenant_User_createdtenantToTenant: {
          connect: {
            id: userInfo.admin.tenantId,
          }
        },
        User_User_createduserToUser: {
          connect: {
            id: userInfo.userId
          }
        },
        UserProfile_UserProfile_userToUser: {
          create: {
            firstname: body.firstName,
            lastname: body.lastName,
            isactive: true,
            createddatetime: new Date(),
            Tenant_UserProfile_createdtenantToTenant: {
              connect: {
                id: userInfo.admin.tenantId
              }
            },
            User_UserProfile_createduserToUser: {
              connect: {
                id: userInfo.userId
              }
            }
          }
        },
        UserContact_UserContact_userToUser: {
          create: {
            value: body.phone,
            isactive: true,
            createddatetime: new Date(),
            User_UserContact_createduserToUser: {
              connect: {
                id: userInfo.userId
              }
            },
            Tenant_UserContact_createdtenantToTenant: {
              connect: {
                id: userInfo.admin.tenantId
              }
            },
            UserContact_RefDatum_usercontacttypeToRefDatum: {
              connect: {
                refdatacode: "CONTACT_TYPE.PHONE"
              }
            },
          },
        },
        UserRoleMap_UserRoleMap_userToUser: {
          create: {
            isactive: true,
            createddatetime: new Date(),
            Role: {
              connect: {
                code: `role.${userInfo.admin.loginname}.user`
              }
            },
            User_UserRoleMap_createduserToUser: {
              connect: {
                id: userInfo.userId
              }
            },
            Tenant_UserRoleMap_createdtenantToTenant: {
              connect: {
                id: userInfo.admin.tenantId
              }
            },
          }
        },
      },
      select: {
        id: true
      }
    });

    return {
      userId: user.id,
      username: body.phone,
      password: password
    };
  }

  async profile(userInfo: UserInfoDto): Promise<ProfileResponseDto> {
    return {
      name: userInfo.fullname,
      role: userInfo.role.name
    }
  }

  async usersListFormForum(userInfo: UserInfoDto): Promise<ListUserResponseDto[]> {
    const user = await this.prisma.user.findMany({
      select: {
        id: true,
        login: true,
        tenant: true,
        Tenant_User_tenantToTenant: {
          select: {
            name: true,
          }
        },
        UserProfile_UserProfile_userToUser: {
          select: {
            firstname: true,
            middlename: true,
            lastname: true
          }
        }
      },
      where: {
        isactive: true,
        NOT: {
          id: userInfo.userId
        }
      },
      orderBy: {
        tenant: "asc"
      }
    });

    return user.map((user) => {
      const nameWithTenant = concatUsernameAndTenant({
        firstName: user.UserProfile_UserProfile_userToUser?.firstname ?? user.login,
        lastName: user.UserProfile_UserProfile_userToUser.lastname,
        middleName: user.UserProfile_UserProfile_userToUser.middlename,
        tenantName: user.Tenant_User_tenantToTenant.name,
      });

      return ({
        id: user.id,
        name: nameWithTenant,
        tenantId: user.tenant
      });
    })
  }
}
