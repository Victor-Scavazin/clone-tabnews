import orchestratror from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestratror.waitForAllServices();
  await orchestratror.clearDatabase();
});

describe("GET /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations");
      expect(response.status).toBe(200);

      const respBody = await response.json();
      expect(Array.isArray(respBody)).toBe(true);
      expect(respBody.length).toBeGreaterThan(0);
    });
  });
});
