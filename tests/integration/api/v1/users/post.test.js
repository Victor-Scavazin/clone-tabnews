import orchestratror from "tests/orchestrator.js";
import { version as uuidVersion } from "uuid";

beforeAll(async () => {
  await orchestratror.waitForAllServices();
  await orchestratror.clearDatabase();
  await orchestratror.runPendingMigrations();
});

describe("POST /api/v1/users", () => {
  describe("Anonymous user", () => {
    test("With unique and valid data", async () => {
      const response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "Victor Scavazin",
          email: "contanto@gmail.com",
          password: "QueSenhaM4neira",
        }),
      });

      expect(response.status).toBe(201);
      const respBody = await response.json();
      expect(respBody).toEqual({
        id: respBody.id,
        username: "Victor Scavazin",
        email: "contanto@gmail.com",
        password: "QueSenhaM4neira",
        created_at: respBody.created_at,
        updated_at: respBody.updated_at,
      });

      expect(uuidVersion(respBody.id)).toBe(4);
      expect(Date.parse(respBody.created_at)).not.toBeNaN();
      expect(Date.parse(respBody.updated_at)).not.toBeNaN();
    });
  });
});
