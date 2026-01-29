import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";
import { createRouter } from "next-connect";
import { InternalServerError, MethodNotAllowedError } from "infra/errors";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler({
  onNoMatch: onNoMatchHanlder,
  onError: onErrorHanlder,
});

function onNoMatchHanlder(request, response) {
  const publicErrorObject = new MethodNotAllowedError();
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

function onErrorHanlder(error, request, response) {
  const publicErrorObject = new InternalServerError({ cause: Error });
  console.log("\nError inside next-connect catch");
  response.status(500).json(publicErrorObject);
}

async function getHandler(request, response) {
  let dbClient;
  try {
    dbClient = await database.getNewClient();
    const defaultMigrationRunnerConfig = {
      dbClient: dbClient,
      dryRun: true,
      dir: resolve("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };
    const pendingMigrations = await migrationRunner(
      defaultMigrationRunnerConfig,
    );
    return response.status(200).json(pendingMigrations);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}

async function postHandler(request, response) {
  let dbClient;
  try {
    dbClient = await database.getNewClient();
    const defaultMigrationRunnerConfig = {
      dbClient: dbClient,
      dryRun: true,
      dir: resolve("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };
    const executedMigrations = await migrationRunner({
      ...defaultMigrationRunnerConfig,
      dryRun: false,
    });
    return response.status(201).json(executedMigrations);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
