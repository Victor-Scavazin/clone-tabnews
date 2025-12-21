import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

export default async function migrate(request, response) {
  const dbClient = await database.getNewClient();
  const defaultMigrationRunnerConfig = {
    dbClient: dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (request.method === "GET") {
    const pendingMigrations = await migrationRunner(
      defaultMigrationRunnerConfig,
    );
    await dbClient.end();
    return response.status(200).json(pendingMigrations);
  }
  if (request.method === "POST") {
    const executedMigrations = await migrationRunner({
      ...defaultMigrationRunnerConfig,
      dryRun: false,
    });
    await dbClient.end();
    return response.status(201).json(executedMigrations);
  }

  return response.status(405).end();
}
