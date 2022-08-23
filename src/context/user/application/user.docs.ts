import env from "@config/env";
import { requestIdInPath, responseObjectCreate } from "@utils/docs";

export const userSchema = {
  type: "object",
  required: ["name", "age", "email"],
  properties: {
    name: {
      type: "string",
      description: "El nombre completo del usuario",
    },
    age: {
      type: "intenger",
      description: "La edad del usuario",
    },
    email: {
      type: "string",
      description: "El nombre correo del usuario",
    },
  },
  example: {
    name: "Jesus Lares",
    age: 22,
    email: "name@email.com",
  },
};

export const userRoutes = {
  [`${env.initialRoute}/user`]: {
    post: {
      summary: "Crear un nuevo usuario",
      tags: ["user"],
      requestBody: {
        required: true,
        ...responseObjectCreate("user"),
      },
      responses: {
        200: {
          description: "user created",
          content: {
            "application/json": {
              schema: {
                type: "object",
                $ref: "#/components/schemas/user",
              },
            },
          },
        },
      },
    },
    get: {
      summary: "Obtiene todos los usuarios",
      tags: ["user"],
      responses: {
        200: {
          description: "Get users",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/user",
                },
              },
            },
          },
        },
      },
    },
  },
  [`${env.initialRoute}/user/{id}`]: {
    get: {
      summary: "Obtiene el usuario por id",
      tags: ["user"],
      parameters: [requestIdInPath("El id del usuario")],
      responses: {
        200: {
          description: "Get user by id",
          ...responseObjectCreate("user"),
        },
      },
    },
    put: {
      summary: "Edita el usuario",
      tags: ["user"],
      parameters: [requestIdInPath("El id del usuario")],
      responses: {
        200: {
          description: "Update user by id",
          content: {
            "application/json": {
              schema: {
                type: "string",
                example: "user updated",
              },
            },
          },
        },
      },
    },
    delete: {
      summary: "Delete user by id",
      tags: ["user"],
      parameters: [requestIdInPath("El id del usuario")],
      responses: {
        200: {
          description: "Delete user by id",
          content: {
            "application/json": {
              schema: {
                type: "string",
                example: "User deleted",
              },
            },
          },
        },
      },
    },
  },
};
