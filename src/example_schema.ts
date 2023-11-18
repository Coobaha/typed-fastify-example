import type { Schema } from "@coobaha/typed-fastify";

interface User {
  name: string;
  id: number;
}

interface ResponseError {
  message: string;
  code: number;
}

export interface ExampleSchema extends Schema {
  paths: {
    "GET /": {
      request: {
        querystring: {
          name?: string;
        };
      };
      response: {
        200: {
          content: User;
        };
        404: {
          content: ResponseError;
        };
      };
    };
  };
}
