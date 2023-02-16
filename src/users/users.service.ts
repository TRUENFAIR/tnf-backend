import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { FindOneResponseDto } from "./dto/findOneResponse.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaClient) {}

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
        createdtenant: true,
        tenant_: {
          select: {
            loginname: true
          }
        },
        userprofiles_user_: {
          select: {
            firstname: true,
            lastname: true
          }
        },
        userrolemaps_user_: {
          select: {
            role_: {
              select: {
                name: true,
                code: true
              }
            }
          }
        }
      }
    });

    if (user) {
      const fullname = `${user.userprofiles_user_?.firstname || ""} ${user.userprofiles_user_?.lastname || ""}`.trim();

      return {
        userId: user.id,
        username: user.login,
        password: user.password,
        fullname: fullname || null,
        admin: {
          userId: user.createduser,
          tenantId: user.createdtenant,
          loginname: user.tenant_.loginname
        },
        role: {
          name: user.userrolemaps_user_.role_.name,
          code: user.userrolemaps_user_.role_.code
        }
      };
    }

    return null;
  }
}
