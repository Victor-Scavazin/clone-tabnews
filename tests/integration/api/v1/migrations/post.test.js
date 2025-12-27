import orchestratror from "tests/orchestrator.js";
import database from "infra/database.js";

beforeAll(async () => {
  await orchestratror.waitForAllServices();
  await database.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
});

describe("POST /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Running pending migrations", () => {
      test("For the first time", async () => {
        const response1 = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );
        await fetch("http://localhost:3000/api/v1/migrations", {
          method: "DELETE",
        });
        expect(response1.status).toBe(201);
        const resultQuery1 = await database.query(
          "SELECT * FROM pgmigrations;",
        );
        const respBody1 = await response1.json();

        expect(Array.isArray(respBody1)).toBe(true);
        expect(respBody1.length).toBeGreaterThan(0);
        expect(resultQuery1.rows.length).toBeGreaterThan(0);
      });

      test("For the second time", async () => {
        //Second post should return empty list but the
        const response2 = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );
        expect(response2.status).toBe(201);
        const resultQuery2 = await database.query(
          "SELECT * FROM pgmigrations;",
        );
        const respBody2 = await response2.json();

        expect(Array.isArray(respBody2)).toBe(true);
        expect(respBody2.length).toBe(0);
        expect(resultQuery2.rows.length).toBeGreaterThan(0);
      });
    });
  });
});
