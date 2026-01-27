import useSWR from "swr";

async function fetchApi(key) {
  const response = await fetch(key);
  const respBody = await response.json();
  return respBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
    </>
  );

  function UpdatedAt() {
    const { isLoading, data } = useSWR("api/v1/status", fetchApi, {
      refreshInterval: 2000,
      dedupingInterval: 2000,
    });

    let updatedAtText = "Loading";
    let maxConnectionsText = "Loading";
    let activeConnectionsText = "Loading";
    let postgresVersionText = "Loading";

    if (!isLoading && data) {
      updatedAtText = new Date(data.updatedAt).toLocaleString("pt-BR");
      const database = data.dependecies.database;
      maxConnectionsText = database.maxConnections;
      activeConnectionsText = database.activeConnections;
      postgresVersionText = database.postgresVersion;
    }

    return (
      <>
        Last update: {updatedAtText} <br />
        <h1>Database</h1>
        Max Connections: {maxConnectionsText} <br />
        Active Connections: {activeConnectionsText} <br />
        Postgres Version: {postgresVersionText} <br />
      </>
    );
  }
}
