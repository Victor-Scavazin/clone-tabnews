import { createRouter } from "next-connect";
import database from "infra/database";
import { InternalServerError, MethodNotAllowedError } from "infra/errors";

const router = createRouter();

router.get(getHandler);

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
  const updatedAt = new Date().toISOString();

  const dbMaxConnectionsResult = await database.query("SHOW max_connections;");
  const dbVersionResult = await database.query("SHOW server_version;");
  const dbName = process.env.POSTGRES_DB;
  const dbActiveConnectionsResult = await database.query({
    text: "SELECT count(*) FROM pg_stat_activity WHERE datname = $1",
    values: [dbName],
  });

  const maxConnections = dbMaxConnectionsResult.rows[0].max_connections;
  const postgresVersion = dbVersionResult.rows[0].server_version;
  const activeConnections = dbActiveConnectionsResult.rows[0].count;
  response.status(200).json({
    updatedAt: updatedAt,
    dependecies: {
      database: {
        maxConnections: parseInt(maxConnections),
        activeConnections: parseInt(activeConnections),
        postgresVersion: postgresVersion,
      },
    },
  });
}
