import { Module } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PasswordService } from "src/auth/password.service";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  controllers: [UsersController],
  providers: [PrismaClient, UsersService, PasswordService],
  exports: [UsersService]
})
export class UsersModule { }
