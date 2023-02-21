import { Module } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreateTopicsController } from "./createTopics.controller";
import { CreateTopicsService } from "./createTopics.service";

@Module({
  controllers: [CreateTopicsController],
  providers: [CreateTopicsService, PrismaClient]
})
export class CreateTopicsModule {}
