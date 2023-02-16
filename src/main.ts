import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { swaggerDocumentOptions, swaggerPath, swaggerSetupOptions } from "./swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: true }));
  app.setGlobalPrefix("/api/v1");

  // Swagger
  const document = SwaggerModule.createDocument(app, swaggerDocumentOptions);
  SwaggerModule.setup(swaggerPath, app, document, swaggerSetupOptions);

  await app.listen(3000);
}
bootstrap();
