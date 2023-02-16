import { Module } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  controllers: [UsersController],
  providers: [PrismaClient, UsersService],
  exports: [UsersService]
})
export class UsersModule {}
