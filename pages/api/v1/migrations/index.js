import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

export default async function migrate(request, response) {
  const requestMethod = request.method;
  if (!["GET", "POST"].includes(requestMethod)) {
    return response.status(405).end();
  }
  let dbClient;
  try {
    dbClient = await database.getNewClient();
    const defaultMigrationRunnerConfig = {
      dbClient: dbClient,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    if (requestMethod === "GET") {
      const pendingMigrations = await migrationRunner(
        defaultMigrationRunnerConfig,
      );
      return response.status(200).json(pendingMigrations);
    }
    if (requestMethod === "POST") {
      const executedMigrations = await migrationRunner({
        ...defaultMigrationRunnerConfig,
        dryRun: false,
      });
      return response.status(201).json(executedMigrations);
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
