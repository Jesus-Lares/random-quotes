import env from "@config/env";

export const viewQuoteSchema = {
  type: "object",
  equired: ["quote", "user"],
  properties: {
    quote: {
      type: "number",
      description: "id de la cita",
    },
    user: {
      type: "number",
      description: "Id del usuario",
    },
  },
  example: {
    quote:
      "El mejor momento para plantar un arbol fue hace 20 años, el segundo mejor momento es ahora.",
    writer: "Antiguo proverbio chino",
  },
};

export const viewQuoteRoutes = {
  [`${env.initialRoute}/shuffle/{apiKey}`]: {
    get: {
      summary: "Obtiene una cita aleatoria",
      tags: ["quote"],
      responses: {
        200: {
          description: "Get random quote",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/viewQuote",
                },
              },
            },
          },
        },
      },
    },
  },
};
