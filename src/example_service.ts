import fastify, { type FastifyServerOptions } from "fastify";
import addSchema, { type Service } from "@coobaha/typed-fastify";

import type { ExampleSchema } from "./example_schema.ts";
import jsonSchema from "./example_schema.gen.json";

export function build(opts: FastifyServerOptions = {}) {
  const app = fastify(opts);

  const exampleService: Service<ExampleSchema> = {
    "GET /": (req, reply) => {
      const name = req.query.name ?? "John";
      if (name === "error") {
        return reply.status(404).send({
          code: 404,
          message: "Not Found",
        });
      }
      return reply.status(200).send({
        id: 1,
        name: name,
      });
    },
  };

  addSchema.default(app, {
    jsonSchema: jsonSchema,
    service: exampleService,
  });

  return app;
}
