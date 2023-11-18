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
  assert.deepStrictEqual(response.json(), { id: 1, name: "John" });
});

test("GET /?name=error", async (t) => {
  const app = build();

  const response = await app.inject({
    method: "GET",
    url: "/?name=error",
  });

  assert.equal(response.statusCode, 404);
  assert.deepStrictEqual(response.json(), { code: 404, message: "Not Found" });
});

test("GET /?name=1&name=2", async (t) => {
  const app = build();

  const response = await app.inject({
    method: "GET",
    url: "/?name=1&name=2",
  });

  assert.equal(response.statusCode, 400);
  assert.deepStrictEqual(response.json(), {
    error: "Bad Request",
    message: "querystring/name must be string",
    statusCode: 400,
    code: "FST_ERR_VALIDATION",
  });
});
