import orchestratror from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestratror.waitForAllServices();
});

describe("POST /api/v1/status", () => {
  describe("Anonymous user", () => {
    describe("Retrieving current system status", () => {
      test("POST to /api/v1/status should return 500", async () => {
        const response = await fetch("http://localhost:3000/api/v1/status", {
          method: "POST",
        });

        expect(response.status).toBe(405);

        const respBody = await response.json();
        expect(respBody).toEqual({
          name: "MethodNotAllowedError",
          message: "Método não permitido para este endpoint.",
          action:
            "Verifique se o método HTTP enviado é válido para este endpoint.",
          statusCode: 405,
        });
      });
    });
  });
});
