import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AuthModule } from "./auth/auth.module";
import { TopicsModule } from "./topics/topics.module";
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
  ]
})
export class AppModule {}
