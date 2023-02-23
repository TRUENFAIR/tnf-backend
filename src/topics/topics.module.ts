import { Module } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { TopicsController } from "./topics.controller";
import { TopicsService } from "./topics.service";

@Module({
  controllers: [TopicsController],
  providers: [TopicsService, PrismaClient]
})
export class TopicsModule {}
