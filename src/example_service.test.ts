import test from "node:test";
import assert from "node:assert";
import { build } from "./example_service.ts";

test("GET /", async (t) => {
  const app = build();

  const response = await app.inject({
    method: "GET",
    url: "/",
  });

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.json(), { id: 1, name: "John" });
});

test("GET /?name=error", async (t) => {
  const app = build();

  const response = await app.inject({
    method: "GET",
    url: "/?name=error",
  });

  assert.equal(response.statusCode, 404);
  assert.deepEqual(response.json(), { code: 404, message: "Not Found" });
});
