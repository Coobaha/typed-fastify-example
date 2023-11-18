/* eslint strict:"off" */
"use strict";
import { build } from "./example_service.ts";
import { FastifyInstance } from "fastify";

async function start(): Promise<void> {
  const app: FastifyInstance = build({ logger: true });
  try {
    await app.listen({
      port: 3000,
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  void start();
}
