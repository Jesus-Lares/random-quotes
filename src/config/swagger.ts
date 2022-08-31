import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";
import { userSchema, userRoutes } from "@context/user/application/user.docs";
import {
  quoteRoutes,
  quoteSchema,
} from "@context/quote/application/quote.docs";

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
      quote: quoteSchema,
    },
  },
  paths: {
    ...userRoutes,
    ...quoteRoutes,
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ["./src/*.ts"],
};

export default swaggerJSDoc(swaggerOptions);
