import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";
import { userSchema, userRoutes } from "@context/user/application/user.docs";

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "Documentacion de la API",
    version: "1.0.0",
    description: "Documentacion del template de la api",
  },
  servers: [
    {
      url: "http://localhost:5000",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      user: userSchema,
    },
  },
  paths: {
    ...userRoutes,
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ["./src/*.ts"],
};

export default swaggerJSDoc(swaggerOptions);
