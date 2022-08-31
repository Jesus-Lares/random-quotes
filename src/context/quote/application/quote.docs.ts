import env from "@config/env";
import { requestIdInPath, responseObjectCreate } from "@utils/docs";

export const quoteSchema = {
  type: "object",
  required: ["quote", "writer", "role", "user"],
  properties: {
    quote: {
      type: "string",
      description: "Cita de alguna persona",
    },
    writer: {
      type: "string",
      description: "Nombre de la persona que escribio la cita",
    },
    role: {
      type: "string",
      description: "El role del usuario que creo la cita",
    },
    user: {
      type: "number",
      description: "Id del usuario que creo la cita",
    },
  },
  example: {
    quote:
      "El mejor momento para plantar un arbol fue hace 20 años, el segundo mejor momento es ahora.",
    writer: "Antiguo proverbio chino",
    role: "client",
    user: 1,
  },
};

export const quoteRoutes = {
  [`${env.initialRoute}/quote`]: {
    post: {
      summary: "Crear una nueva cita",
      tags: ["quote"],
      requestBody: {
        required: true,
        ...responseObjectCreate("quote"),
      },
      responses: {
        200: {
          description: "quote created",
          content: {
            "application/json": {
              schema: {
                type: "object",
                $ref: "#/components/schemas/quote",
              },
            },
          },
        },
      },
    },
    get: {
      summary: "Obtiene todas las citas",
      tags: ["quote"],
      responses: {
        200: {
          description: "Get quotes",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/quote",
                },
              },
            },
          },
        },
      },
    },
  },
  [`${env.initialRoute}/quote/{id}`]: {
    get: {
      summary: "Obtiene la cita por id",
      tags: ["quote"],
      parameters: [requestIdInPath("El id de la cita")],
      responses: {
        200: {
          description: "Get quote by id",
          ...responseObjectCreate("quote"),
        },
      },
    },
    put: {
      summary: "Edita la cita",
      tags: ["quote"],
      parameters: [requestIdInPath("El id de la cita")],
      responses: {
        200: {
          description: "Update quote by id",
          content: {
            "application/json": {
              schema: {
                type: "string",
                example: "quote updated",
              },
            },
          },
        },
      },
    },
    delete: {
      summary: "Elimina la cita",
      tags: ["quote"],
      parameters: [requestIdInPath("El id de la cita")],
      responses: {
        200: {
          description: "Delete quote by id",
          content: {
            "application/json": {
              schema: {
                type: "string",
                example: "quote deleted",
              },
            },
          },
        },
      },
    },
  },
};
