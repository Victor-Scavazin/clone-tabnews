import orchestratror from "tests/orchestrator.js";
import database from "infra/database.js";

beforeAll(async () => {
  await orchestratror.waitForAllServices();
  await database.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
});

test("GET to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const respBody = await response.json();
  expect(Array.isArray(respBody)).toBe(true);
  expect(respBody.length).toBeGreaterThan(0);
});
