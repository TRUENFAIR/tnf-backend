import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerPath = "/docs";

export const swaggerDocumentOptions = new DocumentBuilder()
  .setTitle("True And Fair")
  .setDescription("Backend apis of True And Fair")
  .setVersion("v1.0")
  .addBearerAuth()
  .build();

export const swaggerSetupOptions = {
  swaggerOptions: {
    persistAuthorization: true
  },
  customSiteTitle: "Tseek Apis",
  customfavIcon: "/static/favicon.ico",
  customCssUrl: "/static/swagger.css",
  useGlobalPrefix: true
};
