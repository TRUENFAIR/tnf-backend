import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { PrismaClient } from "@prisma/client";
import { join } from "path";
import { AuthModule } from "./auth/auth.module";
import { TopicsController } from "./create-topics/topics.controller";
import { TopicsModule } from "./create-topics/topics.module";
import { TopicsService } from "./create-topics/topics.service";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: "/static",
      rootPath: join(__dirname, "..", "static")
    }),
    UsersModule,
    AuthModule,
    TopicsModule
  ],
  providers: [TopicsService, PrismaClient],
  controllers: [TopicsController]
})
export class AppModule {}
