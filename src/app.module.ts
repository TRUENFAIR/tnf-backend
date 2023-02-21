import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { PrismaClient } from "@prisma/client";
import { join } from "path";
import { AuthModule } from "./auth/auth.module";
import { CreateTopicsController } from "./create-topics/createTopics.controller";
import { CreateTopicsModule } from "./create-topics/createTopics.module";
import { CreateTopicsService } from "./create-topics/createTopics.service";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: "/static",
      rootPath: join(__dirname, "..", "static")
    }),
    UsersModule,
    AuthModule,
    CreateTopicsModule
  ],
  providers: [CreateTopicsService, PrismaClient],
  controllers: [CreateTopicsController]
})
export class AppModule {}
