import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: "/static",
      rootPath: join(__dirname, "..", "static")
    }),
    UsersModule,
    AuthModule
  ]
})
export class AppModule {}
