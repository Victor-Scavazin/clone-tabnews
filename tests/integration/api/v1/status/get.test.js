import orchestratror from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestratror.waitForAllServices();
});

describe("GET /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Retrieving pending migrations", () => {
      test("GET to /api/v1/status should return 200", async () => {
        const response = await fetch("http://localhost:3000/api/v1/status");
        expect(response.status).toBe(200);

        const respBody = await response.json();
        const updatedAt = respBody.updatedAt;
        const database = respBody.dependecies.database;
        const maxConnections = database.maxConnections;
        const activeConnections = database.activeConnections;
        const postgresVersion = database.postgresVersion;

        expect(updatedAt).toBeDefined();
        expect(maxConnections).toBeDefined();
        expect(activeConnections).toBeDefined();
        expect(postgresVersion).toBeDefined();

        const parsedUpdatedAt = new Date(updatedAt).toISOString();
        expect(updatedAt).toEqual(parsedUpdatedAt);
        expect(maxConnections).toEqual(100);
        expect(activeConnections).toEqual(1);
        expect(postgresVersion).toEqual("16.0");
      });
    });
  });
});
